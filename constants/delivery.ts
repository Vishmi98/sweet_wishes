export type LatLng = { lat: number; lng: number };

export type DeliveryLocation = LatLng & { label: string };

export type PlaceSuggestion = DeliveryLocation;

export type DeliveryQuote =
  | { status: "ok"; distanceKm: number; fee: number }
  | { status: "out_of_range"; distanceKm: number }
  | { status: "no_road" };

// TODO: replace with the shop's exact pin (86/C1, Ranjula, Wallabada, Madampagama).
// This placeholder is central Ambalangoda, so fees are approximate until it's updated.
export const SHOP_LOCATION: LatLng = { lat: 6.2355, lng: 80.0538 };

export const DELIVERY_BASE_FEE = 200; // covers the first km
export const DELIVERY_PER_KM_FEE = 80; // each extra km, part km rounded up
export const MAX_DELIVERY_DISTANCE_KM = 30;

const SRI_LANKA_BOUNDS = { minLat: 5.85, maxLat: 9.9, minLng: 79.5, maxLng: 81.95 };

export function isInSriLanka({ lat, lng }: LatLng) {
  return (
    lat >= SRI_LANKA_BOUNDS.minLat &&
    lat <= SRI_LANKA_BOUNDS.maxLat &&
    lng >= SRI_LANKA_BOUNDS.minLng &&
    lng <= SRI_LANKA_BOUNDS.maxLng
  );
}

export function calculateDeliveryFee(distanceMeters: number) {
  const chargedKm = Math.max(1, Math.ceil(distanceMeters / 1000));
  return DELIVERY_BASE_FEE + (chargedKm - 1) * DELIVERY_PER_KM_FEE;
}

export function isWithinDeliveryRange(distanceMeters: number) {
  return distanceMeters <= MAX_DELIVERY_DISTANCE_KM * 1000;
}

export function getDeliveryQuote(distanceMeters: number): DeliveryQuote {
  // Round the shown distance up to 0.1 km so it never looks shorter than what's charged.
  const distanceKm = Math.ceil(distanceMeters / 100) / 10;

  if (!isWithinDeliveryRange(distanceMeters)) {
    return { status: "out_of_range", distanceKm };
  }

  return { status: "ok", distanceKm, fee: calculateDeliveryFee(distanceMeters) };
}
