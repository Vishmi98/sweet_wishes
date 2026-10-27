"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { FiCrosshair, FiSearch } from "react-icons/fi";

import {
  MAX_DELIVERY_DISTANCE_KM,
  type DeliveryLocation,
  type LatLng,
  type PlaceSuggestion,
} from "@/constants/delivery";
import { formatPrice } from "@/constants/pricing";
import type { DeliveryQuoteState } from "@/modules/shop/hooks/useDeliveryQuote";

// Leaflet needs the browser, so the map is never server-rendered.
const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => <div className="h-[222px] w-full animate-pulse border border-line bg-cream" />,
});

const MIN_QUERY_LENGTH = 3;
const SEARCH_DELAY_MS = 400;

type SearchResult = {
  query: string;
  status: "done" | "error";
  suggestions: PlaceSuggestion[];
};

type GpsStatus = "idle" | "locating" | "denied" | "unavailable";

type DeliveryLocationPickerProps = {
  location: DeliveryLocation | null;
  onLocationChange: (location: DeliveryLocation) => void;
  note: string;
  onNoteChange: (note: string) => void;
  quote: DeliveryQuoteState;
};

function getQuoteMessage(quote: DeliveryQuoteState): ReactNode {
  switch (quote.status) {
    case "idle":
      return "Search for your address or tap the map, then drag the pin to the exact spot.";
    case "loading":
      return "Calculating the delivery fee…";
    case "ok":
      return (
        <>
          {quote.distanceKm} km by road · Delivery fee{" "}
          <strong className="font-semibold text-ink">{formatPrice(quote.fee)}</strong>
        </>
      );
    case "out_of_range":
      return `About ${quote.distanceKm} km away by road, outside our ${MAX_DELIVERY_DISTANCE_KM} km delivery area. Message us on WhatsApp for a quote.`;
    case "no_road":
      return "We couldn't find a road near this pin. Move it closer to a road.";
    case "outside_sri_lanka":
      return "This pin is outside Sri Lanka. Move it to your delivery address.";
    case "error":
      return "We couldn't calculate the fee right now. We'll confirm it on WhatsApp.";
  }
}

export default function DeliveryLocationPicker({
  location,
  onLocationChange,
  note,
  onNoteChange,
  quote,
}: DeliveryLocationPickerProps) {
  const id = useId();
  const searchInputId = `${id}-search`;
  const noteInputId = `${id}-note`;
  const listboxId = `${id}-suggestions`;

  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [gpsStatus, setGpsStatus] = useState<GpsStatus>("idle");

  const trimmedQuery = query.trim();
  // Skip searching again for the suggestion that was just picked.
  const shouldSearch =
    trimmedQuery.length >= MIN_QUERY_LENGTH && trimmedQuery !== location?.label;

  useEffect(() => {
    if (!shouldSearch) return;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(`/api/delivery/search?q=${encodeURIComponent(trimmedQuery)}`, {
        signal: controller.signal,
      })
        .then(async (response) => {
          const data = (await response.json()) as { results?: PlaceSuggestion[] };

          if (!response.ok || !Array.isArray(data.results)) {
            throw new Error(`Address search failed with status ${response.status}`);
          }

          setSearchResult({ query: trimmedQuery, status: "done", suggestions: data.results });
        })
        .catch(() => {
          if (!controller.signal.aborted) {
            setSearchResult({ query: trimmedQuery, status: "error", suggestions: [] });
          }
        });
    }, SEARCH_DELAY_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [shouldSearch, trimmedQuery]);

  const currentResult = shouldSearch && searchResult?.query === trimmedQuery ? searchResult : null;
  const suggestions = currentResult?.suggestions ?? [];
  const showDropdown = isOpen && shouldSearch;
  const showSuggestions = showDropdown && suggestions.length > 0;

  function selectSuggestion(suggestion: PlaceSuggestion) {
    onLocationChange(suggestion);
    setQuery(suggestion.label);
    setIsOpen(false);
    setActiveIndex(-1);
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
      selectSuggestion(suggestions[activeIndex]);
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

  return (
    <div className="flex flex-col gap-[10px]">
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
                <ul id={listboxId} role="listbox" aria-label="Address suggestions">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={`${suggestion.lat},${suggestion.lng},${index}`}
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
                      onClick={() => selectSuggestion(suggestion)}
                    >
                      {suggestion.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

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
            Location access is blocked. Search for your address or tap the map instead.
          </p>
        )}
        {gpsStatus === "unavailable" && (
          <p className="mt-1 text-[9px] text-[#938680]">
            We couldn&apos;t get your location. Search for your address or tap the map instead.
          </p>
        )}
      </div>

      <DeliveryMap position={location} onPositionChange={handlePinChange} />

      <p
        className={`text-[10px] leading-[1.6] ${
          quote.status === "ok" || quote.status === "idle" || quote.status === "loading"
            ? "text-[#74645f]"
            : "text-rose-dark"
        }`}
        aria-live="polite"
      >
        {getQuoteMessage(quote)}
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
