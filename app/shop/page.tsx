import type { Metadata } from "next";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ShopCatalog from "@/modules/shop/ui/ShopCatalog";

export const metadata: Metadata = {
  title: "All Cakes & Treats | Sweet Wishes",
  description:
    "Explore the Sweet Wishes collection of small-batch cakes, cupcakes, and handmade treats.",
};

export default function ShopPage() {
  return (
    <main>
      <Navbar />
      <ShopCatalog />
      <Footer />
    </main>
  );
}
