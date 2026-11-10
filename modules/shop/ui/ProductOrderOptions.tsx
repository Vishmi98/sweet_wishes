"use client";

import Image from "next/image";
import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

import {
  createWebsiteOrderMessage,
  flowerBouquetOptions,
  formatPrice,
  getDiscountedPrice,
  isCakeDiscounted,
  photoFrameOptions,
  WEBSITE_DISCOUNT_PERCENTAGE,
} from "@/constants/pricing";

type ProductOrderOptionsProps = {
  cake: {
    slug: string;
    name: string;
    price: number;
  };
};

export default function ProductOrderOptions({ cake }: ProductOrderOptionsProps) {
  const [frameSize, setFrameSize] = useState("");
  const [bouquetSize, setBouquetSize] = useState("");

  const selectedFrame = photoFrameOptions.find((frame) => frame.size === frameSize);
  const selectedBouquet = flowerBouquetOptions.find(
    (bouquet) => bouquet.size === bouquetSize,
  );
  const hasDiscount = isCakeDiscounted(cake.slug);
  const subtotal =
    cake.price + (selectedFrame?.price ?? 0) + (selectedBouquet?.price ?? 0);
  const discountAmount = cake.price - getDiscountedPrice(cake.price, hasDiscount);
  const discountedTotal = subtotal - discountAmount;
  const orderMessage = createWebsiteOrderMessage(cake, frameSize, bouquetSize);

  return (
    <div className="mt-7">
      <p className="mb-5 text-[11px] leading-[1.7] text-[#827671]">
        Personalize your order with optional gifts. Your selections and a clear
        price breakdown will be included in the WhatsApp message.
      </p>

      <fieldset className="mb-5 min-w-0 border-0 p-0">
        <legend className="mb-[10px] w-full font-[Georgia,Times_New_Roman,serif] text-base">
          Photo frame <span className="ml-[7px] font-sans text-[9px] text-[#938680]">Optional</span>
        </legend>
        <div className="grid grid-cols-2 gap-[7px]">
          {photoFrameOptions.map((frame) => (
            <label
              className={`flex min-h-[43px] cursor-pointer items-center gap-2 border px-[10px] py-[9px] text-[#74645f] transition-colors ${frameSize === frame.size ? "border-[#d7aaa5] bg-[#fff8f5]" : "border-line bg-paper hover:border-[#d7aaa5] hover:bg-[#fff8f5]"}`}
              key={frame.size}
            >
              <input
                className="m-0 h-[13px] w-[13px] flex-none accent-rose-dark"
                type="radio"
                name="photo-frame"
                value={frame.size}
                checked={frameSize === frame.size}
                onChange={() => setFrameSize(frame.size)}
              />
              <span className="text-[9px]">{frame.size}&quot; frame</span>
              <span className="ml-auto whitespace-nowrap font-semibold text-ink text-xs">{formatPrice(frame.price)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mb-5 min-w-0 border-0 p-0">
        <legend className="mb-[10px] w-full font-[Georgia,Times_New_Roman,serif] text-base">
          Fresh flower bouquet <span className="ml-[7px] font-sans text-[9px] text-[#938680]">Optional</span>
        </legend>
        <div className="grid grid-cols-3 gap-[10px]">
          {flowerBouquetOptions.map((bouquet) => (
            <label
              className={`flex min-w-0 cursor-pointer flex-col overflow-hidden border transition-colors ${bouquetSize === bouquet.size
                  ? "border-[#d7aaa5] bg-[#fff8f5]"
                  : "border-line bg-paper hover:border-[#d7aaa5] hover:bg-[#fff8f5]"
                }`}
              key={bouquet.size}
            >
              <input
                className="peer sr-only"
                type="radio"
                name="flower-bouquet"
                value={bouquet.size}
                checked={bouquetSize === bouquet.size}
                onChange={() => setBouquetSize(bouquet.size)}
              />
              <Image
                className="aspect-[1.53] h-[130px] md:h-[150px] w-full bg-cream object-cover peer-focus-visible:outline-2 peer-focus-visible:outline-rose-dark"
                src={bouquet.image}
                alt={bouquet.imageAlt}
                width={260}
                height={170}
                sizes="(max-width: 700px) 40vw, 180px"
              />
              <span className="flex min-h-[40px] items-center justify-center gap-[6px] px-[10px] text-xs">
                <span className="whitespace-nowrap font-semibold text-ink">{formatPrice(bouquet.price)}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="my-[23px] mt-[23px] mb-[17px] border border-line bg-white p-4 shadow-[0_8px_24px_rgba(53,42,41,.045)] max-[400px]:p-3" aria-live="polite">
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-line pb-3">
          <div>
            <p className="m-0 text-[9px] font-semibold uppercase tracking-[.12em] text-[#827671]">Your order summary</p>
            <p className="mt-1 mb-0 text-[9px] text-[#938680]">Starting-price estimate</p>
          </div>
          {hasDiscount && (
            <span className="whitespace-nowrap bg-[#edf5ef] px-2 py-1 text-[9px] font-semibold text-[#3f7963]">
              {WEBSITE_DISCOUNT_PERCENTAGE}% off selected cake
            </span>
          )}
        </div>
        <p className="flex justify-between gap-3 text-[10px] leading-[1.6] text-[#74645f]">
          <span className="min-w-0">{cake.name} <span className="text-[#938680]">(cake starting price)</span></span>
          <span className="whitespace-nowrap">{formatPrice(cake.price)}</span>
        </p>
        {selectedFrame && (
          <p className="mt-2 flex justify-between gap-3 text-[10px] leading-[1.6] text-[#74645f]">
            <span>{selectedFrame.size}&quot; photo frame</span>
            <span>{formatPrice(selectedFrame.price)}</span>
          </p>
        )}
        {selectedBouquet && (
          <p className="mt-2 flex justify-between gap-3 text-[10px] leading-[1.6] text-[#74645f]">
            <span>{selectedBouquet.imageAlt}</span>
            <span>{formatPrice(selectedBouquet.price)}</span>
          </p>
        )}
        <p className="mt-[13px] flex justify-between gap-3 border-t border-line pt-3 text-[10px] leading-[1.6] text-[#74645f]"><span>Subtotal <span className="text-[#938680]">(before discount)</span></span><span className="whitespace-nowrap">{formatPrice(subtotal)}</span></p>
        {hasDiscount && (
          <p className="mt-2 flex justify-between gap-3 text-[10px] leading-[1.6] font-medium text-[#3f7963]">
            <span>{WEBSITE_DISCOUNT_PERCENTAGE}% discount on cake only</span>
            <span className="whitespace-nowrap">−{formatPrice(discountAmount)}</span>
          </p>
        )}
        <p className="mt-3 flex items-baseline justify-between gap-3 border-t border-[#d8c9c0] pt-3 font-[Georgia,Times_New_Roman,serif] text-base text-ink">
          <strong className="font-normal">Estimated total</strong>
          <strong className="whitespace-nowrap text-lg font-semibold text-rose-dark">{formatPrice(discountedTotal)}</strong>
        </p>
        <p className="mt-3 border-t border-dashed border-line pt-3 text-[9px] leading-[1.7] text-[#827671]">
          Delivery isn&apos;t included. We&apos;ll confirm the final price after checking your location and cake details.
          {selectedFrame && " Send your frame photo in the WhatsApp chat."}
        </p>
      </div>

      <a
        className="button button-dark mt-[5px] w-full justify-between"
        href={`https://wa.me/94716091425?text=${orderMessage}`}
        target="_blank"
        rel="noreferrer"
      >
        Order on WhatsApp
        <FiArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          aria-hidden="true"
        />
      </a>
      <p className="mt-[10px] text-center text-[9px] text-[#938680]">
        WhatsApp opens with your cake, selected gifts, discount (if eligible), and estimated total clearly listed.
      </p>
    </div>
  );
}
