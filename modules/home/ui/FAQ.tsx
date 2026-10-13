import Link from 'next/link'
import React from 'react'

const FAQ = () => {
    return (
        <section
            className="bg-paper px-[10.2%] py-[76px] max-[1000px]:px-[7%] max-[700px]:px-[7%] max-[700px]:py-[55px]"
            aria-labelledby="faq-heading"
        >
            <div className="mx-auto grid max-w-[1160px] grid-cols-[.8fr_1.2fr] gap-12 max-[700px]:grid-cols-1 max-[700px]:gap-7">
                <div>
                    <p className="eyebrow"><span /> A few helpful answers</p>
                    <h2
                        className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(38px,4vw,52px)] font-normal leading-[1.08] tracking-[-.05em]"
                        id="faq-heading"
                    >
                        A little <em className="font-normal text-rose">help.</em>
                    </h2>
                    <p className="mt-4 mb-0 max-w-[320px] text-[12px] leading-[1.8] text-[#827671]">
                        Planning something sweet? Here are a few things to know before
                        placing your order.
                    </p>
                </div>

                <div className="divide-y divide-line border-y border-line">
                    <details name="faq-accordion" className="group py-1">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-[Georgia,Times_New_Roman,serif] text-lg marker:content-none [&::-webkit-details-marker]:hidden">
                            How do I place an order?
                            <span className="font-sans text-2xl font-light text-rose-dark transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                        </summary>
                        <p className="max-w-[600px] pb-5 pr-8 text-[11px] leading-[1.8] text-[#766c68]">
                            Choose a cake from our <Link className="text-rose-dark underline underline-offset-2" href="/shop">cake collection</Link>,
                            select any optional gifts, then tap “Order on WhatsApp.” We&apos;ll
                            confirm the details and final price with you there.
                        </p>
                    </details>

                    <details name="faq-accordion" className="group py-1">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-[Georgia,Times_New_Roman,serif] text-lg marker:content-none [&::-webkit-details-marker]:hidden">
                            How does the 10% website discount work?
                            <span className="font-sans text-2xl font-light text-rose-dark transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                        </summary>
                        <p className="max-w-[600px] pb-5 pr-8 text-[11px] leading-[1.8] text-[#766c68]">
                            The estimated total shows 10% off the listed cake starting
                            price only. Selected gift add-ons are full price, and
                            delivery is confirmed separately on WhatsApp.
                        </p>
                    </details>

                    <details name="faq-accordion" className="group py-1">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-[Georgia,Times_New_Roman,serif] text-lg marker:content-none [&::-webkit-details-marker]:hidden">
                            Can I add a photo frame or fresh flowers?
                            <span className="font-sans text-2xl font-light text-rose-dark transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                        </summary>
                        <p className="max-w-[600px] pb-5 pr-8 text-[11px] leading-[1.8] text-[#766c68]">
                            Yes. On a cake&apos;s details page, choose a photo-frame size, a
                            flower bouquet, or both. If you choose a frame, send us your
                            photo in the WhatsApp chat after starting your order.
                        </p>
                    </details>

                    <details name="faq-accordion" className="group py-1">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-[Georgia,Times_New_Roman,serif] text-lg marker:content-none [&::-webkit-details-marker]:hidden">
                            Do you offer pickup and delivery?
                            <span className="font-sans text-2xl font-light text-rose-dark transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                        </summary>
                        <p className="max-w-[600px] pb-5 pr-8 text-[11px] leading-[1.8] text-[#766c68]">
                            Pickup and local delivery are available. For delivery, share
                            your location in WhatsApp so we can confirm the delivery fee
                            and add it to your final order total.
                        </p>
                    </details>

                    <details name="faq-accordion" className="group py-1">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-[Georgia,Times_New_Roman,serif] text-lg marker:content-none [&::-webkit-details-marker]:hidden">
                            How far ahead should I order?
                            <span className="font-sans text-2xl font-light text-rose-dark transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                        </summary>
                        <p className="max-w-[600px] pb-5 pr-8 text-[11px] leading-[1.8] text-[#766c68]">
                            We recommend pre-ordering. Availability can depend on the cake
                            and date, so contact us with your plans and we&apos;ll let you
                            know what we can arrange.
                        </p>
                    </details>
                </div>
            </div>
        </section>
    )
}

export default FAQ