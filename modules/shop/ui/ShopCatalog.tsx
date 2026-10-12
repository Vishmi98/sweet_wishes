"use client";

import { useState } from "react";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

import CakeCard from "./CakeCard";

import { cakes, filters } from "@/constants/data";
import { GENERAL_WEBSITE_ORDER_MESSAGE } from "@/constants/pricing";

export default function ShopCatalog() {
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const visibleCakes =
    activeFilter === filters[0]
      ? cakes
      : cakes.filter((cake) => cake.category === activeFilter);

  return (
    <section className="min-h-[70vh] px-[10.2%] pt-10 pb-[95px] max-[1000px]:px-[7%] max-[700px]:px-[7%] max-[700px]:pt-[30px] max-[700px]:pb-[68px]">
      <div className="mb-11 flex items-center gap-[10px] text-[10px] text-[#938680] max-[700px]:mb-[34px] [&_a:hover]:text-[var(--rose-dark)]">
        <Link href="/">Home</Link><span>/</span><span>Our cakes</span>
      </div>
      <div className="section-heading max-[700px]:block">
        <div>
          <p className="eyebrow"><span /> A little something for every occasion</p>
          <h1 className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(44px,5.3vw,70px)] font-normal leading-[1.05] tracking-[-.055em] max-[700px]:text-[46px]">All the <em className="font-normal text-[var(--rose)]">good things.</em></h1>
        </div>
        <p className="mt-0 mb-[5px] max-w-[290px] text-[11px] leading-[1.8] text-[#827671] max-[700px]:mt-[15px]">
          From just-because cupcakes to the cake everyone remembers. Find the
          one that feels like you.
        </p>
      </div>
      <div className="mt-[38px] mb-[23px] flex items-center justify-between border-b border-[var(--line)] pb-[14px] max-[700px]:mt-[29px] max-[700px]:items-start max-[700px]:gap-3">
        <div className="flex gap-[25px] max-[700px]:gap-[14px] max-[390px]:gap-[10px]" aria-label="Filter cakes">
          {filters.map((filter) => (
            <button
              className={`relative cursor-pointer border-0 bg-transparent px-0 pb-[7px] text-[10px] text-[#92847f] max-[700px]:text-[9px] ${activeFilter === filter ? "text-[var(--ink)] after:absolute after:right-0 after:bottom-[-15px] after:left-0 after:h-px after:bg-[var(--rose)] after:content-['']" : ""}`}
              type="button"
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>
        <span className="text-[10px] text-[#938680]">
          {String(visibleCakes.length).padStart(2, "0")} little treats
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-[38px] pb-8 min-[1001px]:grid-cols-4 max-[700px]:gap-x-[13px] max-[700px]:gap-y-7 [&_h3]:text-[19px] [&_p]:text-[10px]">
        {visibleCakes.map((cake) => (
          <CakeCard cake={cake} index={cakes.indexOf(cake)} key={cake.slug} />
        ))}
      </div>
      <div className="mt-[54px] flex items-center justify-between gap-4 border-t border-[var(--line)] py-5 text-[11px] text-[#827671]">
        <span>Have a special idea in mind?</span>
        <a
          className="text-link text-[var(--rose-dark)]"
          href={`https://wa.me/94716091425?text=${GENERAL_WEBSITE_ORDER_MESSAGE}`}
        >
          Let&apos;s dream it up <BsArrowRight />
        </a>
      </div>
    </section>
  );
}
