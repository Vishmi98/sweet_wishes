import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import { bakeryJsonLd, BUSINESS, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteDescription =
  "Homemade birthday cakes, wedding and anniversary cakes, and delicious cupcakes baked to order in Ambalangoda, Sri Lanka. Cake delivery available to Balapitiya, Hikkaduwa, Ahungalla, Kosgoda, Elpitiya, Karandeniya, Bentota, Aluthgama, Galle and nearby areas. Order your custom cake on WhatsApp!";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS.name} | ${BUSINESS.tagline}`,
    template: `%s | ${BUSINESS.name}`,
  },
  description: siteDescription,
  applicationName: BUSINESS.name,
  openGraph: {
    type: "website",
    siteName: BUSINESS.name,
    locale: "en_LK",
    title: `${BUSINESS.name} | ${BUSINESS.tagline}`,
    description: siteDescription,
    images: [{ url: BUSINESS.shareImage, alt: "A freshly frosted celebration cake by Sweet Wishes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name} | ${BUSINESS.tagline}`,
    description: siteDescription,
    images: [BUSINESS.shareImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={bakeryJsonLd} />
        {children}
      </body>
    </html>
  );
}
