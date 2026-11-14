import type { Metadata } from "next";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ShopCatalog from "@/modules/shop/ui/ShopCatalog";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Cakes & Cupcakes in Ambalangoda",
  description:
    "Shop homemade birthday cakes, cupcakes, anniversary and wedding cakes, and custom cakes from Sweet Wishes in Ambalangoda. Delivering to Hikkaduwa, Balapitiya and Galle.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <main>
      <Navbar />
      <ShopCatalog />
      <Footer />
    </main>
  );
}
