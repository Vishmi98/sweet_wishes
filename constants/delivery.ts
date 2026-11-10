// Keep this file free of imports: constants/pricing.ts imports it.

export type LatLng = { lat: number; lng: number };

export type DeliveryLocation = LatLng & { label: string };

export type DeliveryQuote =
  // A fee of 0 means free delivery.
  | { status: "ok"; distanceKm: number; fee: number }
  | { status: "no_road" };

// The shop at 86/C1, Ranjula, Wallabada, Madampagama, Ambalangoda.
export const SHOP_LOCATION: LatLng = { lat: 6.216451732490503, lng: 80.06002700361883 };

// Delivery pricing comes from env vars so it can follow fuel and electricity costs.
// NEXT_PUBLIC_ values are baked in at build time for both the server and the browser,
// so the fee we charge always matches the prices we show. Rebuild/redeploy after changing them.
// Next.js only inlines literal process.env.NEXT_PUBLIC_* references, so read each one by name.
function readWholeNumber(value: string | undefined, name: string, fallback?: number) {
  const trimmed = value?.trim();

  if (!trimmed) {
    if (fallback !== undefined) return fallback;
    throw new Error(`${name} is not set. Add it to .env (see .env.example).`);
  }

  const number = Number(trimmed);

  if (!Number.isInteger(number) || number < 0) {
    throw new Error(`${name} must be a whole number of 0 or more, but it is "${trimmed}".`);
  }

  return number;
}

// Deliveries up to this many km by road are free.
export const DELIVERY_FREE_KM = readWholeNumber(
  process.env.NEXT_PUBLIC_DELIVERY_FREE_KM,
  "NEXT_PUBLIC_DELIVERY_FREE_KM",
  2,
);

// LKR for the first km past the free zone.
export const DELIVERY_FIRST_KM_FEE = readWholeNumber(
  process.env.NEXT_PUBLIC_DELIVERY_FIRST_KM_FEE,
  "NEXT_PUBLIC_DELIVERY_FIRST_KM_FEE",
  300,
);

// LKR for each km after that.
export const DELIVERY_PER_KM_FEE = readWholeNumber(
  process.env.NEXT_PUBLIC_DELIVERY_PER_KM_FEE,
  "NEXT_PUBLIC_DELIVERY_PER_KM_FEE",
);

const SRI_LANKA_BOUNDS = { minLat: 5.85, maxLat: 9.9, minLng: 79.5, maxLng: 81.95 };

export function isInSriLanka({ lat, lng }: LatLng) {
  return (
    lat >= SRI_LANKA_BOUNDS.minLat &&
    lat <= SRI_LANKA_BOUNDS.maxLat &&
    lng >= SRI_LANKA_BOUNDS.minLng &&
    lng <= SRI_LANKA_BOUNDS.maxLng
  );
}

// With the defaults (2 km free, LKR 300 first km): 2.0 km is free, 2.3 km is 300,
// 3.5 km is 300 + 1 per-km fee, and 5 km is 300 + 2 per-km fees.
export function getDeliveryQuote(distanceMeters: number): DeliveryQuote {
  if (!Number.isFinite(distanceMeters) || distanceMeters < 0) {
    throw new Error(`Invalid delivery distance: ${distanceMeters} m`);
  }

  // The fee is based on the distance we show (nearest 0.1 km), so the two always agree.
  // Counting whole 100 m steps avoids floating-point surprises at the boundaries.
  const tenthsOfKm = Math.round(distanceMeters / 100);
  const distanceKm = tenthsOfKm / 10;

  if (tenthsOfKm <= DELIVERY_FREE_KM * 10) {
    return { status: "ok", distanceKm, fee: 0 };
  }

  // Past the free zone, round to the nearest whole km (x.5 rounds up). The first km
  // after the free zone costs the first-km fee, and every km after that the per-km fee.
  const roundedKm = Math.floor((tenthsOfKm + 5) / 10);
  const extraKm = Math.max(0, roundedKm - DELIVERY_FREE_KM - 1);

  return {
    status: "ok",
    distanceKm,
    fee: DELIVERY_FIRST_KM_FEE + extraKm * DELIVERY_PER_KM_FEE,
  };
}
