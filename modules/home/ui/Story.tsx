import Image from 'next/image'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'

const Story = () => {
    return (
        <section className="grid min-h-[450px] grid-cols-2 bg-[var(--cream)] max-[700px]:grid-cols-1" id="story">
            <div className="relative min-h-[450px] overflow-hidden bg-[#e4d7cb] max-[700px]:min-h-[300px]">
                <Image
                    src="/2.jpeg"
                    alt="A baker preparing fresh ingredients in a bright kitchen"
                    fill
                    sizes="(max-width: 700px) 100vw, 50vw"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <span className="absolute right-0 bottom-0 bg-[rgba(53,42,41,.74)] px-[17px] py-[13px] font-[Georgia,Times_New_Roman,serif] text-xs italic text-white">A little flour, a lot of love.</span>
            </div>
            <div className="max-w-[550px] self-center px-[12%] py-16 max-[1000px]:pr-[8%] max-[1000px]:pl-[9%] max-[700px]:max-w-none max-[700px]:px-[8%] max-[700px]:py-[50px]">
                <p className="eyebrow whitespace-nowrap max-[700px]:whitespace-normal"><span /> From our kitchen to your table</p>
                <h2 className="mb-5 font-[Georgia,Times_New_Roman,serif] text-[clamp(40px,4vw,55px)] font-normal leading-[1.04] tracking-[-.055em] max-[700px]:text-[45px]">Every cake tells<br />a <em className="font-normal text-[var(--rose)]">sweet story.</em></h2>

                <p className="mb-[23px] text-[11px] leading-[1.9] text-[var(--muted)]">
                    At <strong>Sweet Wishes</strong>, our journey officially started in 2021, but the seed was planted years ago around our family kitchen table. Growing up, family celebrations were never complete without my mother&apos;s magic watching her transform simple ingredients into edible art and carefully swirl every layer of icing. Having refined her craft through professional baking classes back in the day, she passed down her passion and secrets to us.
                </p>

                <p className="mb-[23px] text-[11px] leading-[1.9] text-[var(--muted)]">
                    Over time, we blended those cherished homemade traditions with modern techniques and creative global flavors. Today, <strong>Sweet Wishes</strong> is a celebration of that legacy. From our kitchen to your special moments, we bake with the same love, warmth, and attention to detail that started right at home.
                </p>

                <a className="text-link text-[var(--rose-dark)]" href="#contact">Get in touch with us <BsArrowRight /></a>
                <div className="mt-[29px] text-[10px] text-[#998b85]">With love, <em className="ml-[5px] font-[Georgia,Times_New_Roman,serif] text-sm not-italic text-[var(--ink)]">The Sweet Wishes team</em></div>
            </div>
        </section>
    )
}

export default Story