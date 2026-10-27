import type { NextRequest } from "next/server";

import { searchPlaces } from "@/lib/openroute";

export async function GET(request: NextRequest) {
  const query = (request.nextUrl.searchParams.get("q") ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

  if (query.length < 3 || query.length > 100) {
    return Response.json({ error: "Enter between 3 and 100 characters." }, { status: 400 });
  }

  try {
    const results = await searchPlaces(query);
    return Response.json({ results });
  } catch (error) {
    console.error("Delivery address search failed", error);
    return Response.json({ error: "Address search is unavailable right now." }, { status: 502 });
  }
}
