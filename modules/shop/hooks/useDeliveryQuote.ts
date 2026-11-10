"use client";

import { useEffect, useState } from "react";

import { isInSriLanka, type DeliveryQuote, type LatLng } from "@/constants/delivery";

export type DeliveryQuoteState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error" }
  | { status: "outside_sri_lanka" }
  | DeliveryQuote;

function isDeliveryQuote(value: unknown): value is DeliveryQuote {
  if (!value || typeof value !== "object" || !("status" in value)) return false;

  const quote = value as Record<string, unknown>;

  switch (quote.status) {
    case "ok":
      return typeof quote.distanceKm === "number" && typeof quote.fee === "number";
    case "no_road":
      return true;
    default:
      return false;
  }
}

// Fetches the road-distance fee for a pin, cancelling outdated requests.
export function useDeliveryQuote(location: LatLng | null): DeliveryQuoteState {
  const inSriLanka = location ? isInSriLanka(location) : false;
  const key =
    location && inSriLanka ? `${location.lat.toFixed(5)},${location.lng.toFixed(5)}` : null;
  const [result, setResult] = useState<{ key: string; state: DeliveryQuoteState } | null>(null);
  const resultKey = result?.key;

  useEffect(() => {
    // Each quote is a paid Google request, so don't ask again for a pin we already have
    // (for example when Next.js shows this page again after navigating back).
    if (!key || key === resultKey) return;

    const [lat, lng] = key.split(",");
    const controller = new AbortController();

    fetch(`/api/delivery/quote?lat=${lat}&lng=${lng}`, { signal: controller.signal })
      .then(async (response) => {
        const data: unknown = await response.json();

        if (!response.ok || !isDeliveryQuote(data)) {
          throw new Error(`Delivery quote failed with status ${response.status}`);
        }

        setResult({ key, state: data });
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setResult({ key, state: { status: "error" } });
        }
      });

    return () => controller.abort();
  }, [key, resultKey]);

  if (!location) return { status: "idle" };
  if (!inSriLanka) return { status: "outside_sri_lanka" };
  if (result?.key !== key) return { status: "loading" };

  return result.state;
}
