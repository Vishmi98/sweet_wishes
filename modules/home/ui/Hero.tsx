import Image from 'next/image'
import React from 'react'
import { BiHeart } from 'react-icons/bi'
import { BsArrowRight } from 'react-icons/bs'

const Hero = () => {
    return (
        <section className="relative grid min-h-[548px] grid-cols-[.95fr_1.05fr] items-center gap-0 overflow-hidden bg-[var(--cream)] px-[10.2%] pt-[52px] pb-[85px] max-[1000px]:px-[8%] max-[700px]:grid-cols-1 max-[700px]:gap-[26px] max-[700px]:px-[7%] max-[700px]:pt-[54px] max-[700px]:pb-[76px]" id="home">
            <div className="relative z-[1] max-w-[500px] py-[7px] pb-[6px] max-[700px]:mx-auto max-[700px]:max-w-[540px]">
                <p className="eyebrow"><span /> Baked for the lovely little moments</p>
                <h1 className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(46px,5.6vw,76px)] font-normal leading-[1.04] tracking-[-.055em] max-[1000px]:text-[58px] max-[700px]:text-[clamp(48px,12vw,66px)]">
                    A little slice<br />of <em className="font-normal text-[var(--rose)]">something lovely.</em>
                </h1>
                <p className="my-[23px] mb-[26px] max-w-[385px] text-[13px] leading-[1.85] text-[#766c68] max-[700px]:mt-[19px] max-[700px]:max-w-[400px]">
                    Small batch cakes made by hand, with the good stuff and a whole lot
                    of heart. Because every day deserves a little celebration.
                </p>
                <div className="flex items-center gap-[26px] max-[390px]:gap-[15px]">
                    <a className="button button-dark" href="#shop">
                        Find your favorite <BsArrowRight />
                    </a>
                    <a className="text-link max-[390px]:text-[10px]" href="#story">Get to know us</a>
                </div>
                <div className="mt-9 flex items-center gap-[11px] text-[9px] tracking-[.02em] text-[#827671] max-[700px]:mt-6">
                    <span className="text-[10px] tracking-[.15em] text-[var(--rose)]">★★★★★</span>
                    <span>Loved by the neighborhood since 2021</span>
                </div>
            </div>
            <div className="relative w-[min(100%,510px)] justify-self-end md:px-[18px] pt-[13px] pb-[30px] max-[700px]:w-[min(100%,430px)] max-[700px]:justify-self-center max-[700px]:pr-[13px]">
                <div className="relative h-[420px] overflow-hidden rounded-[49%_49%_3px_3px/43%_43%_3px_3px] bg-[#e9dcd1] shadow-[0_18px_50px_rgba(80,55,47,.1)] max-[1000px]:h-[340px] max-[700px]:h-[clamp(260px,77vw,360px)]">
                    <Image
                        src="/1.png"
                        alt="A freshly frosted celebration cake topped with berries"
                        fill
                        priority
                        sizes="(max-width: 700px) 90vw, 45vw"
                        className="h-full w-full object-cover object-[center_53%]"
                    />
                </div>
                <div className="absolute top-[54px] right-[-21px] flex h-[90px] w-[90px] rotate-[9deg] flex-col items-center justify-center gap-[3px] rounded-full bg-[var(--rose)] text-white shadow-[0_7px_20px_rgba(189,94,100,.18)] max-[700px]:top-[33px] max-[700px]:right-[-9px] max-[700px]:h-[75px] max-[700px]:w-[75px]">
                    <BiHeart className="w-[19px] stroke-current" />
                    <span className="text-center font-[Georgia,Times_New_Roman,serif] text-xs leading-[1.05] max-[700px]:text-[11px]">made<br />with love</span>
                </div>
                <div className="absolute right-[13px] bottom-0 text-[9px] text-[#827671]">
                    A very good reason to celebrate
                </div>
            </div>
            <div className="absolute top-1/2 right-7 -translate-y-1/2 [writing-mode:vertical-rl] text-[8px] tracking-[.18em] text-[#a89b94] max-[700px]:hidden">
                FRESH FROM OUR LITTLE OVEN · EST. 2021
            </div>
        </section>
    )
}

export default Hero