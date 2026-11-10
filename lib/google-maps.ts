import "server-only";

import { SHOP_LOCATION, type LatLng } from "@/constants/delivery";

// Google Routes API. DRIVE + TRAFFIC_UNAWARE + distance-only is the cheapest
// (Essentials) tier; asking for more fields or traffic moves it to a pricier one.
const ROUTES_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";
const REQUEST_TIMEOUT_MS = 8000;

// Pins this close to the shop count as 0 km without calling Google.
const AT_SHOP_RADIUS_METERS = 50;

type ComputeRoutesResponse = {
  routes?: Array<{ distanceMeters?: number }>;
  error?: { code?: number; message?: string; status?: string };
};

export type RoadDistance = { distanceMeters: number } | { noRoute: true };

function getApiKey() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error("GOOGLE_MAPS_API_KEY is not set. Add it to .env.");
  }

  return apiKey;
}

function toWaypoint({ lat, lng }: LatLng) {
  return { location: { latLng: { latitude: lat, longitude: lng } } };
}

// Flat-earth approximation; accurate enough over a few hundred metres.
function straightLineMeters(from: LatLng, to: LatLng) {
  const toRadians = Math.PI / 180;
  const x = (to.lng - from.lng) * toRadians * Math.cos(((from.lat + to.lat) / 2) * toRadians);
  const y = (to.lat - from.lat) * toRadians;

  return Math.hypot(x, y) * 6_371_000;
}

// Road distance from the shop. Deliberately not cached: Google's terms don't allow
// storing route distances. Throws on network, key or quota errors.
export async function getRoadDistance(destination: LatLng): Promise<RoadDistance> {
  if (straightLineMeters(SHOP_LOCATION, destination) <= AT_SHOP_RADIUS_METERS) {
    return { distanceMeters: 0 };
  }

  const response = await fetch(ROUTES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": getApiKey(),
      "X-Goog-FieldMask": "routes.distanceMeters",
    },
    body: JSON.stringify({
      origin: toWaypoint(SHOP_LOCATION),
      destination: toWaypoint(destination),
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_UNAWARE",
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  const data = (await response.json().catch(() => ({}))) as ComputeRoutesResponse;

  if (!response.ok) {
    throw new Error(
      `Google Routes request failed with status ${response.status}: ${data.error?.message ?? "unknown error"}`,
    );
  }

  // Google replies with an empty object when no drivable route exists.
  const route = data.routes?.[0];

  if (!route) {
    return { noRoute: true };
  }

  // Google leaves zero values out of its JSON, so a missing distance means 0 m.
  return { distanceMeters: route.distanceMeters ?? 0 };
}
