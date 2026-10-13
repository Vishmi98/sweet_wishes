import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { LuFlower2 } from "react-icons/lu";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { GENERAL_WEBSITE_ORDER_MESSAGE } from "@/constants/pricing";
import Hero from "@/modules/home/ui/Hero";
import Categories from "@/modules/home/ui/Categories";
import Story from "@/modules/home/ui/Story";
import FAQ from "@/modules/home/ui/FAQ";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <section className="mx-[6.1%] pb-14 flex items-center gap-[23px] bg-chocolate px-[clamp(22px,5vw,64px)] py-[25px] text-[#fffaf5] max-[1000px]:mx-[4%] max-[700px]:mx-0 max-[700px]:flex-wrap max-[700px]:items-start max-[700px]:gap-4 max-[700px]:px-[7%]" aria-labelledby="home-discount-heading">
        <div className="grid h-[66px] w-[66px] flex-none place-items-center rounded-full border border-[rgba(255,255,255,.58)] font-[Georgia,Times_New_Roman,serif] text-[21px] max-[700px]:h-[54px] max-[700px]:w-[54px] max-[700px]:text-lg" aria-hidden="true">10%</div>
        <div className="min-w-0 flex-1 max-[700px]:flex-[1_1_calc(100%-70px)]">
          <p className="eyebrow mb-[7px] text-line"><span /> A little thank-you from us</p>
          <h2 id="home-discount-heading" className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(24px,3vw,36px)] font-normal tracking-[-.04em] max-[700px]:text-[27px]">A sweeter order, <em className="font-normal text-[#f0b9b0]">10% off.</em></h2>
          <p className="mt-[7px] mb-0 text-[10px] text-[#f1e4dc]">Enjoy 10% off every order placed through our website.</p>
        </div>
        <Link className="button button-light shrink-0 max-[700px]:ml-[70px] max-[700px]:min-h-10" href="/shop">
          Find your favorite <BsArrowRight />
        </Link>
      </section>

      <section className="relative z-[2] mx-[6.1%] -mt-[37px] grid grid-cols-3 bg-white px-[25px] py-5 shadow-[0_15px_44px_rgba(53,42,41,.08)] max-[1000px]:mx-[4%] max-[1000px]:px-[10px] max-[700px]:mx-[5%] max-[700px]:-mt-[31px] max-[700px]:grid-cols-1 max-[700px]:px-[18px] max-[700px]:py-[11px]" aria-label="Explore Sweet Wishes">
        <Link className="group flex min-h-[71px] items-center gap-[15px] border-r border-line px-[22px] py-2 last:border-0 max-[1000px]:gap-[10px] max-[1000px]:px-3 max-[700px]:min-h-[68px] max-[700px]:gap-[15px] max-[700px]:border-r-0 max-[700px]:border-b max-[700px]:px-[3px] max-[700px]:last:border-0" href="/shop">
          <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-chocolate font-[Georgia,Times_New_Roman,serif] text-2xl text-white max-[700px]:h-[43px] max-[700px]:w-[43px]">
            <HiSparkles className="h-5 w-5" />
          </span>
          <span className="flex-1"><strong className="mb-[5px] block font-[Georgia,Times_New_Roman,serif] text-base font-normal italic max-[1000px]:text-sm">Made for you</strong><small className="block text-[10px] text-[#827671]">Custom cakes, your way</small></span>
          <BsArrowRight className="w-[15px] text-[#a9968f] transition-transform group-hover:translate-x-[3px]" />
        </Link>
        <Link className="group flex min-h-[71px] items-center gap-[15px] border-r border-line px-[22px] py-2 last:border-0 max-[1000px]:gap-[10px] max-[1000px]:px-3 max-[700px]:min-h-[68px] max-[700px]:gap-[15px] max-[700px]:border-r-0 max-[700px]:border-b max-[700px]:px-[3px] max-[700px]:last:border-0" href="/shop">
          <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-rose font-[Georgia,Times_New_Roman,serif] text-2xl text-white max-[700px]:h-[43px] max-[700px]:w-[43px]">
            <FaRegHeart className="h-4 w-4" />
          </span>
          <span className="flex-1"><strong className="mb-[5px] block font-[Georgia,Times_New_Roman,serif] text-base font-normal italic max-[1000px]:text-sm">Little sweet things</strong><small className="block text-[10px] text-[#827671]">Our everyday favorites</small></span>
          <BsArrowRight className="w-[15px] text-[#a9968f] transition-transform group-hover:translate-x-[3px]" />
        </Link>
        <a className="group flex min-h-[71px] items-center gap-[15px] border-r border-line px-[22px] py-2 last:border-0 max-[1000px]:gap-[10px] max-[1000px]:px-3 max-[700px]:min-h-[68px] max-[700px]:gap-[15px] max-[700px]:border-r-0 max-[700px]:border-b max-[700px]:px-[3px] max-[700px]:last:border-0" href="#contact">
          <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-green font-[Georgia,Times_New_Roman,serif] text-2xl text-white max-[700px]:h-[43px] max-[700px]:w-[43px]">
            <LuFlower2 className="h-5 w-5" />
          </span>
          <span className="flex-1"><strong className="mb-[5px] block font-[Georgia,Times_New_Roman,serif] text-base font-normal italic max-[1000px]:text-sm">Let&apos;s celebrate</strong><small className="block text-[10px] text-[#827671]">Something lovely is coming</small></span>
          <BsArrowRight className="w-[15px] text-[#a9968f] transition-transform group-hover:translate-x-[3px]" />
        </a>
      </section>

      <Categories />

      <Story />

      <FAQ />

      <section className="flex min-h-[218px] items-center justify-between gap-[25px] bg-ink px-[10.2%] py-[45px] text-[#fff9f3] max-[1000px]:px-[7%] max-[700px]:min-h-[240px] max-[700px]:flex-col max-[700px]:items-start max-[700px]:justify-center max-[700px]:gap-5 max-[700px]:px-[8%]" id="contact">
        <div>
          <p className="eyebrow text-rose"><span className="bg-rose" /> Have a sweet idea?</p>
          <h2 className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(37px,4vw,52px)] font-normal leading-[1.04] tracking-[-.055em] max-[700px]:text-[43px]">Let&apos;s make <em className="font-normal text-rose-dark">your day.</em></h2>
        </div>
        <a
          className="button button-light"
          href={`https://wa.me/94716091425?text=${GENERAL_WEBSITE_ORDER_MESSAGE}`}
        >
          Chat on WhatsApp
          <BsArrowRight />
        </a>
      </section>

      <Footer />
    </main>
  );
}
