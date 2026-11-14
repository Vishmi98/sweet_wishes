import type { Metadata } from "next";

import { cakes, NEXT_PUBLIC_SITE_URL } from "@/constants/data";

/**
 * Public URL of the live site. Set NEXT_PUBLIC_SITE_URL (e.g. https://sweetwishes.lk)
 * on your host before deploying — sitemap, canonical links and share previews use it.
 */
export const SITE_URL = (NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Blog dates are stored as display strings ("October 12, 2026"); search engines need ISO dates.
 * Returns a plain date ("2026-10-12") so the build machine's time zone can't shift the day.
 */
export function toIsoDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return undefined;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}`;
}

/** Towns we deliver to / want to rank for. Edit to match real delivery areas. */
export const SERVICE_AREAS = [
  "Ambalangoda",
  "Balapitiya",
  "Ahungalla",
  "Hikkaduwa",
  "Kosgoda",
  "Elpitiya",
  "Karandeniya",
  "Bentota",
  "Baddegama",
  "Aluthgama",
  "Galle",
] as const;

const prices = cakes.map((cake) => cake.price);

export const BUSINESS = {
  name: "Sweet Wishes",
  tagline: "Homemade Cakes in Ambalangoda",
  phone: "+94716091425",
  email: "sweetwishes.lk@gmail.com",
  logo: "/logo.png",
  shareImage: "/1.png",
  address: {
    streetAddress: "86/C1, Ranjula, Wallabada, Madampagama",
    addressLocality: "Ambalangoda",
    addressCountry: "LK",
  },
  socialLinks: [
    "https://www.facebook.com/share/1EyP2oAbSq/",
    "https://www.tiktok.com/@_sweet_wishes_",
  ],
  priceRange: `LKR ${Math.min(...prices)} - ${Math.max(...prices)}`,
} as const;

type PageMetadataInput = {
  /** Page title without the brand — the root layout's template appends " | Sweet Wishes". */
  title: string;
  description: string;
  /** Path of the page, e.g. "/shop". Used for the canonical link and og:url. */
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

/**
 * Builds per-page metadata. Next.js replaces (not merges) nested fields like openGraph,
 * so each page passes everything its share preview needs.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = BUSINESS.shareImage,
  imageAlt = `${BUSINESS.name} - ${BUSINESS.tagline}`,
  type = "website",
  publishedTime,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${BUSINESS.name}`;
  const images = [{ url: image, alt: imageAlt }];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      siteName: BUSINESS.name,
      locale: "en_LK",
      url: path,
      title: fullTitle,
      description,
      images,
      ...(type === "article" ? { type, publishedTime } : { type }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/** Serialises structured data for a <script type="application/ld+json"> tag, escaping "<" to prevent XSS. */
export function jsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const bakeryJsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  "@id": absoluteUrl("/#bakery"),
  name: BUSINESS.name,
  description:
    "Homemade birthday, wedding and anniversary cakes and cupcakes, baked to order in Ambalangoda, Sri Lanka.",
  url: absoluteUrl("/"),
  logo: absoluteUrl(BUSINESS.logo),
  image: absoluteUrl(BUSINESS.shareImage),
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  priceRange: BUSINESS.priceRange,
  address: { "@type": "PostalAddress", ...BUSINESS.address },
  areaServed: SERVICE_AREAS.map((town) => ({ "@type": "City", name: town })),
  sameAs: [...BUSINESS.socialLinks],
};
