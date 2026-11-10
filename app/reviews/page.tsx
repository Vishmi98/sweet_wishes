import type { Metadata } from "next";
import Link from "next/link";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CustomerReviews from "@/modules/reviews/ui/CustomerReviews";

export const metadata: Metadata = {
  title: "Customer Review Preview | Sweet Wishes",
  description:
    "Preview the Sweet Wishes customer review page with clearly labeled sample ratings and order references.",
};

export default function ReviewsPage() {
  return (
    <main>
      <Navbar />
      <section className="bg-cream px-[10.2%] pt-10 pb-[58px] max-[1000px]:px-[7%] max-[700px]:pt-[30px] max-[700px]:pb-[38px]">
        <nav
          className="mb-9 flex items-center gap-[10px] text-[10px] text-[#938680] [&_a:hover]:text-rose-dark max-[700px]:mb-[28px]"
          aria-label="Breadcrumb"
        >
          <Link href="/">Home</Link><span>/</span>
          <span aria-current="page">Customer reviews</span>
        </nav>
        <div className="mx-auto max-w-[720px] py-5 text-center">
          <p className="eyebrow justify-center"><span /> Baked with love, remembered with joy</p>
          <h1 className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(43px,5.5vw,70px)] font-normal leading-[1.05] tracking-[-.055em] max-[700px]:text-[46px]">
            A little love, <em className="font-normal text-rose">in every review.</em>
          </h1>
          <p className="mx-auto mt-5 mb-0 max-w-[520px] text-[11px] leading-[1.9] text-[#827671]">
            A preview of how customer feedback will appear, with ratings and
            order references. All reviews shown are fictional samples.
          </p>
        </div>
      </section>
      <CustomerReviews />
      <Footer />
    </main>
  );
}
