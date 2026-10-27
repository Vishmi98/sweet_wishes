import type { NextRequest } from "next/server";

import { getDeliveryQuote, isInSriLanka, type DeliveryQuote } from "@/constants/delivery";
import { getRoadDistance } from "@/lib/openroute";

// About 11 m precision: close enough for pricing, and nearby pins share a cache entry.
function roundCoordinate(value: number) {
  return Math.round(value * 10_000) / 10_000;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const lat = Number(params.get("lat"));
  const lng = Number(params.get("lng"));

  if (!Number.isFinite(lat) || !Number.isFinite(lng) || !isInSriLanka({ lat, lng })) {
    return Response.json({ error: "Choose a location in Sri Lanka." }, { status: 400 });
  }

  try {
    const route = await getRoadDistance({ lat: roundCoordinate(lat), lng: roundCoordinate(lng) });
    const quote: DeliveryQuote =
      "noRoute" in route ? { status: "no_road" } : getDeliveryQuote(route.distanceMeters);

    return Response.json(quote);
  } catch (error) {
    console.error("Delivery quote failed", error);
    return Response.json({ error: "Delivery fee is unavailable right now." }, { status: 502 });
  }
}
