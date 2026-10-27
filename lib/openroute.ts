import "server-only";

import { cacheLife } from "next/cache";

import { SHOP_LOCATION, type LatLng, type PlaceSuggestion } from "@/constants/delivery";

// OpenRouteService (OpenStreetMap data). Free Standard plan limits:
// 1,000 autocomplete and 2,000 directions requests per day.
const ORS_BASE_URL = "https://api.openrouteservice.org";
const REQUEST_TIMEOUT_MS = 8000;
const MAX_SUGGESTIONS = 5;

// ORS error codes for "no road near this point" and "no route between the points".
const NO_ROUTE_ERROR_CODES = new Set([2009, 2010]);

type AutocompleteResponse = {
  features?: Array<{
    geometry?: { coordinates?: [number, number] };
    properties?: { label?: string; name?: string };
  }>;
};

type DirectionsResponse = {
  routes?: Array<{ summary?: { distance?: number } }>;
  error?: { code?: number; message?: string };
};

export type RoadDistance = { distanceMeters: number } | { noRoute: true };

function getApiKey() {
  const apiKey = process.env.ORS_API_KEY;

  if (!apiKey) {
    throw new Error("ORS_API_KEY is not set. Add it to .env.local.");
  }

  return apiKey;
}

export async function searchPlaces(text: string): Promise<PlaceSuggestion[]> {
  "use cache";
  cacheLife("days");

  const params = new URLSearchParams({
    text,
    "boundary.country": "LK",
    "focus.point.lat": String(SHOP_LOCATION.lat),
    "focus.point.lon": String(SHOP_LOCATION.lng),
  });

  const response = await fetch(`${ORS_BASE_URL}/geocode/autocomplete?${params}`, {
    headers: { Authorization: getApiKey(), Accept: "application/json" },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`ORS autocomplete failed with status ${response.status}`);
  }

  const data = (await response.json()) as AutocompleteResponse;
  const suggestions: PlaceSuggestion[] = [];

  for (const feature of data.features ?? []) {
    const [lng, lat] = feature.geometry?.coordinates ?? [];
    const label = feature.properties?.label ?? feature.properties?.name;

    if (typeof lat === "number" && typeof lng === "number" && label) {
      suggestions.push({ label, lat, lng });
    }
  }

  return suggestions.slice(0, MAX_SUGGESTIONS);
}

// Throws on network or quota errors so they aren't cached; "no route" is cached
// because it won't change for the same point.
export async function getRoadDistance(destination: LatLng): Promise<RoadDistance> {
  "use cache";
  cacheLife("days");

  const response = await fetch(`${ORS_BASE_URL}/v2/directions/driving-car`, {
    method: "POST",
    headers: {
      Authorization: getApiKey(),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // ORS expects [lng, lat] order.
      coordinates: [
        [SHOP_LOCATION.lng, SHOP_LOCATION.lat],
        [destination.lng, destination.lat],
      ],
      // How far (in metres) each point may be from a road.
      radiuses: [1000, 500],
      instructions: false,
      geometry: false,
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  const data = (await response.json().catch(() => ({}))) as DirectionsResponse;

  if (!response.ok) {
    if (data.error?.code && NO_ROUTE_ERROR_CODES.has(data.error.code)) {
      return { noRoute: true };
    }

    throw new Error(
      `ORS directions failed with status ${response.status}: ${data.error?.message ?? "unknown error"}`,
    );
  }

  const route = data.routes?.[0];

  if (!route) {
    return { noRoute: true };
  }

  // ORS leaves distance out when start and end are the same point.
  return { distanceMeters: route.summary?.distance ?? 0 };
}
