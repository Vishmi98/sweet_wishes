"use client";

import {
  APILoadingStatus,
  APIProvider,
  useApiLoadingStatus,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { FiCrosshair, FiSearch } from "react-icons/fi";

import { SHOP_LOCATION, type DeliveryLocation, type LatLng } from "@/constants/delivery";
import { formatPrice } from "@/constants/pricing";
import type { DeliveryQuoteState } from "@/modules/shop/hooks/useDeliveryQuote";
import DeliveryMap from "@/modules/shop/ui/DeliveryMap";

declare global {
  interface Window {
    // Google Maps calls this when it rejects the browser key (wrong key, website or billing).
    gm_authFailure?: () => void;
  }
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const MIN_QUERY_LENGTH = 3;
const SEARCH_DELAY_MS = 400;
// Rank places near the shop first without hiding the rest of the island (50 km is Google's maximum).
const SEARCH_BIAS = { center: SHOP_LOCATION, radius: 50_000 };

type Suggestion = {
  id: string;
  label: string;
  prediction: google.maps.places.PlacePrediction;
};

type SearchResult = {
  query: string;
  status: "done" | "error";
  suggestions: Suggestion[];
};

type GpsStatus = "idle" | "locating" | "denied" | "unavailable";

type DeliveryLocationPickerProps = {
  location: DeliveryLocation | null;
  onLocationChange: (location: DeliveryLocation) => void;
  note: string;
  onNoteChange: (note: string) => void;
  quote: DeliveryQuoteState;
};

function getQuoteMessage(quote: DeliveryQuoteState, mapUnavailable: boolean): ReactNode {
  switch (quote.status) {
    case "idle":
      return mapUnavailable
        ? "Use your current location to see the delivery fee, or share your location on WhatsApp and we'll confirm it."
        : "Search for your address or tap the map, then drag the pin to the exact spot.";
    case "loading":
      return "Calculating the delivery fee…";
    case "ok":
      return quote.fee === 0 ? (
        <>
          {quote.distanceKm} km by road ·{" "}
          <strong className="font-semibold text-ink">Free delivery</strong>
        </>
      ) : (
        <>
          {quote.distanceKm} km by road · Delivery fee{" "}
          <strong className="font-semibold text-ink">{formatPrice(quote.fee)}</strong>
        </>
      );
    case "no_road":
      return "We couldn't find a road near this pin. Move it closer to a road.";
    case "outside_sri_lanka":
      return "This pin is outside Sri Lanka. Move it to your delivery address.";
    case "error":
      return "We couldn't calculate the fee right now. We'll confirm it on WhatsApp.";
  }
}

export default function DeliveryLocationPicker(props: DeliveryLocationPickerProps) {
  // Without a browser key there's no map or search, but GPS and the fee still work.
  if (!GOOGLE_MAPS_API_KEY) {
    return <PickerContent {...props} hasMapsKey={false} />;
  }

  // The Maps hooks only work below the provider, so the picker itself is a child component.
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} region="LK" language="en">
      <PickerContent {...props} hasMapsKey />
    </APIProvider>
  );
}

function PickerContent({
  location,
  onLocationChange,
  note,
  onNoteChange,
  quote,
  hasMapsKey,
}: DeliveryLocationPickerProps & { hasMapsKey: boolean }) {
  const id = useId();
  const searchInputId = `${id}-search`;
  const noteInputId = `${id}-note`;
  const listboxId = `${id}-suggestions`;

  const places = useMapsLibrary("places");
  const loadingStatus = useApiLoadingStatus();
  const [authFailed, setAuthFailed] = useState(false);
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const latestSelectionRef = useRef(0);

  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [pendingLabel, setPendingLabel] = useState<string | null>(null);
  const [selectFailed, setSelectFailed] = useState(false);
  const [gpsStatus, setGpsStatus] = useState<GpsStatus>("idle");

  const mapUnavailable =
    !hasMapsKey ||
    authFailed ||
    loadingStatus === APILoadingStatus.FAILED ||
    loadingStatus === APILoadingStatus.AUTH_FAILURE;

  useEffect(() => {
    if (!hasMapsKey) return;

    window.gm_authFailure = () => setAuthFailed(true);

    return () => {
      delete window.gm_authFailure;
    };
  }, [hasMapsKey]);

  const trimmedQuery = query.trim();
  // Skip searching again for the suggestion that was just picked (or is still loading).
  const shouldSearch =
    !mapUnavailable &&
    trimmedQuery.length >= MIN_QUERY_LENGTH &&
    trimmedQuery !== location?.label &&
    trimmedQuery !== pendingLabel;

  useEffect(() => {
    if (!shouldSearch || !places) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      // One token per search, so Google bills the typing and the final pick as one session.
      sessionTokenRef.current ??= new places.AutocompleteSessionToken();

      places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
        input: trimmedQuery,
        sessionToken: sessionTokenRef.current,
        includedRegionCodes: ["lk"],
        locationBias: SEARCH_BIAS,
        language: "en",
        region: "lk",
      })
        .then(({ suggestions: results }) => {
          if (cancelled) return;

          setSearchResult({
            query: trimmedQuery,
            status: "done",
            suggestions: results.flatMap(({ placePrediction }) =>
              placePrediction
                ? [
                    {
                      id: placePrediction.placeId,
                      label: placePrediction.text.toString(),
                      prediction: placePrediction,
                    },
                  ]
                : [],
            ),
          });
        })
        .catch(() => {
          if (!cancelled) {
            setSearchResult({ query: trimmedQuery, status: "error", suggestions: [] });
          }
        });
    }, SEARCH_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [places, shouldSearch, trimmedQuery]);

  const currentResult = shouldSearch && searchResult?.query === trimmedQuery ? searchResult : null;
  const suggestions = currentResult?.suggestions ?? [];
  const showDropdown = isOpen && shouldSearch;
  const showSuggestions = showDropdown && suggestions.length > 0;

  async function selectSuggestion(suggestion: Suggestion) {
    const selection = ++latestSelectionRef.current;

    setQuery(suggestion.label);
    setPendingLabel(suggestion.label);
    setSelectFailed(false);
    setIsOpen(false);
    setActiveIndex(-1);

    try {
      // Ask for the location only: it keeps the lookup in Google's cheapest tier.
      const { place } = await suggestion.prediction.toPlace().fetchFields({ fields: ["location"] });
      const position = place.location;

      if (!position) {
        throw new Error("Google returned no location for this place.");
      }

      // Ignore a slow lookup if another place was picked in the meantime.
      if (selection === latestSelectionRef.current) {
        onLocationChange({ label: suggestion.label, lat: position.lat(), lng: position.lng() });
      }
    } catch {
      if (selection === latestSelectionRef.current) {
        setSelectFailed(true);
      }
    } finally {
      // Looking up the place ends the search session; the next search starts a new one.
      sessionTokenRef.current = null;

      if (selection === latestSelectionRef.current) {
        setPendingLabel(null);
      }
    }
  }

  function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (!suggestions.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => (index <= 0 ? suggestions.length - 1 : index - 1));
    } else if (event.key === "Enter" && showSuggestions && suggestions[activeIndex]) {
      event.preventDefault();
      void selectSuggestion(suggestions[activeIndex]);
    }
  }

  function findCurrentLocation() {
    if (!navigator.geolocation) {
      setGpsStatus("unavailable");
      return;
    }

    setGpsStatus("locating");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setGpsStatus("idle");
        setQuery("");
        setSelectFailed(false);
        onLocationChange({ lat: coords.latitude, lng: coords.longitude, label: "Current location" });
      },
      (error) => setGpsStatus(error.code === error.PERMISSION_DENIED ? "denied" : "unavailable"),
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 },
    );
  }

  const locationLabel = location?.label;
  const handlePinChange = useCallback(
    (position: LatLng) => onLocationChange({ ...position, label: locationLabel ?? "Pin on map" }),
    [locationLabel, onLocationChange],
  );

  const gpsFallbackHint = mapUnavailable
    ? "Share your location on WhatsApp instead."
    : "Search for your address or tap the map instead.";

  return (
    <div className="flex flex-col gap-[10px]">
      {mapUnavailable ? (
        <p className="text-[10px] leading-[1.6] text-[#74645f]">
          The map and address search aren&apos;t available right now.
        </p>
      ) : (
        <div className="relative">
          <label className="mb-[6px] block text-[10px] text-[#74645f]" htmlFor={searchInputId}>
            Delivery address
          </label>
          <div className="relative">
            <FiSearch
              className="pointer-events-none absolute left-[11px] top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#938680]"
              aria-hidden="true"
            />
            <input
              id={searchInputId}
              className="h-[43px] w-full border border-line bg-paper pl-8 pr-3 text-base text-ink outline-none transition-colors placeholder:text-[#a2958f] focus:border-[#d7aaa5] sm:text-xs"
              type="text"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={showSuggestions}
              aria-controls={listboxId}
              aria-activedescendant={
                showSuggestions && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
              }
              autoComplete="off"
              placeholder="Search a town, street or landmark"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSelectFailed(false);
                setIsOpen(true);
                setActiveIndex(-1);
              }}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setIsOpen(false)}
              onKeyDown={handleSearchKeyDown}
            />

            {showDropdown && (
              <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-auto border border-line bg-paper shadow-[0_8px_24px_rgba(53,42,41,0.12)]">
                {!currentResult && (
                  <p className="px-3 py-[10px] text-[10px] text-[#938680]">Searching…</p>
                )}
                {currentResult?.status === "error" && (
                  <p className="px-3 py-[10px] text-[10px] text-[#938680]">
                    Search isn&apos;t available right now. Tap the map to set your location instead.
                  </p>
                )}
                {currentResult?.status === "done" && !suggestions.length && (
                  <p className="px-3 py-[10px] text-[10px] text-[#938680]">
                    No matches. Try a nearby town or landmark, or tap the map.
                  </p>
                )}
                {showSuggestions && (
                  <>
                    <ul id={listboxId} role="listbox" aria-label="Address suggestions">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={suggestion.id}
                          id={`${id}-option-${index}`}
                          role="option"
                          aria-selected={index === activeIndex}
                          className={`cursor-pointer px-3 py-[10px] text-[11px] leading-[1.5] transition-colors ${
                            index === activeIndex
                              ? "bg-[#fff8f5] text-ink"
                              : "text-[#74645f] hover:bg-[#fff8f5]"
                          }`}
                          // Keep focus in the input so blur doesn't close the list before the click lands.
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => void selectSuggestion(suggestion)}
                        >
                          {suggestion.label}
                        </li>
                      ))}
                    </ul>
                    {/* Google requires attribution wherever its place results are shown. */}
                    <p className="border-t border-line px-3 py-[6px] text-right text-xs text-[#938680]">
                      Google Maps
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
          {selectFailed && (
            <p className="mt-1 text-[9px] text-[#938680]">
              We couldn&apos;t find that place on the map. Try another result or tap the map.
            </p>
          )}
        </div>
      )}

      <div>
        <button
          className="inline-flex items-center gap-[6px] text-[10px] text-rose-dark underline-offset-2 hover:underline disabled:opacity-60"
          type="button"
          onClick={findCurrentLocation}
          disabled={gpsStatus === "locating"}
        >
          <FiCrosshair className="h-3 w-3" aria-hidden="true" />
          {gpsStatus === "locating" ? "Finding your location…" : "Use my current location"}
        </button>
        {gpsStatus === "denied" && (
          <p className="mt-1 text-[9px] text-[#938680]">
            Location access is blocked. {gpsFallbackHint}
          </p>
        )}
        {gpsStatus === "unavailable" && (
          <p className="mt-1 text-[9px] text-[#938680]">
            We couldn&apos;t get your location. {gpsFallbackHint}
          </p>
        )}
      </div>

      {!mapUnavailable && <DeliveryMap position={location} onPositionChange={handlePinChange} />}

      <p
        className={`text-[10px] leading-[1.6] ${
          quote.status === "ok" || quote.status === "idle" || quote.status === "loading"
            ? "text-[#74645f]"
            : "text-rose-dark"
        }`}
        aria-live="polite"
      >
        {getQuoteMessage(quote, mapUnavailable)}
      </p>

      <div>
        <label className="mb-[6px] block text-[10px] text-[#74645f]" htmlFor={noteInputId}>
          House no. / nearby landmark <span className="text-[9px] text-[#938680]">Optional</span>
        </label>
        <input
          id={noteInputId}
          className="h-[43px] w-full border border-line bg-paper px-3 text-base text-ink outline-none transition-colors placeholder:text-[#a2958f] focus:border-[#d7aaa5] sm:text-xs"
          type="text"
          maxLength={150}
          placeholder="e.g. No. 12, near the temple"
          value={note}
          onChange={(event) => onNoteChange(event.target.value)}
        />
      </div>
    </div>
  );
}
