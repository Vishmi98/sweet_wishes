"use client"

import { useState } from 'react'
import Link from "next/link";
import { BsArrowRight } from 'react-icons/bs';

import { cakes, filters } from '@/constants/data'
import CakeCard from '@/modules/shop/ui/CakeCard'

const Categories = () => {
    const [activeFilter, setActiveFilter] = useState("All treats");

    const visibleCakes =
        activeFilter === "All treats"
            ? cakes
            : cakes.filter((cake) => cake.category === activeFilter);

    return (
        <section className="px-[10.2%] pt-[107px] pb-[95px] max-[1000px]:px-[7%] max-[700px]:px-[7%] max-[700px]:pt-[76px] max-[700px]:pb-[68px]" id="shop">
            <div className="section-heading max-[700px]:block">
                <div>
                    <p className="eyebrow"><span /> A few of our favorites</p>
                    <h2 className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(40px,4vw,55px)] font-normal leading-[1.04] tracking-[-.055em] max-[700px]:text-[45px]">Good things,<br className="hidden max-[700px]:inline" /> <em className="font-normal text-[var(--rose)]">freshly baked.</em></h2>
                </div>
                <p className="mt-0 mb-[5px] max-w-[290px] text-[11px] leading-[1.8] text-[#827671] max-[700px]:mt-[15px]">
                    The kind of cake that makes you close your eyes at the first bite.
                    Find your new favorite below.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 py-8 min-[1001px]:grid-cols-4 max-[1000px]:gap-x-5 max-[700px]:gap-x-[13px] max-[700px]:gap-y-7">
                {visibleCakes.map((cake) => (
                    <CakeCard cake={cake} index={cakes.indexOf(cake)} key={cake.slug} />
                ))}
            </div>
            <div className="mt-[37px] flex items-center justify-between gap-3 border-t border-[var(--line)] pt-5 text-[10px] text-[#827671] max-[700px]:mt-[27px] max-[700px]:items-start max-[700px]:text-[9px]">
                <span>Handmade in small batches, always.</span>
                <Link className="button min-h-[41px] border border-[#d8c9c0] bg-transparent hover:bg-[var(--ink)] hover:text-white max-[700px]:min-h-[37px] max-[700px]:gap-2 max-[700px]:px-[10px] max-[700px]:text-[8px] max-[700px]:whitespace-nowrap" href="/shop">See all the good stuff <BsArrowRight /></Link>
            </div>
        </section>
    )
}

export default Categories