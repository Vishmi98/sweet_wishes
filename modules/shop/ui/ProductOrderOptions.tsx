"use client";

import Image from "next/image";
import { useState } from "react";

import {
  createWebsiteOrderMessage,
  flowerBouquetOptions,
  formatPrice,
  getDiscountedPrice,
  photoFrameOptions,
  WEBSITE_DISCOUNT_PERCENTAGE,
} from "@/constants/pricing";

type ProductOrderOptionsProps = {
  cake: {
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
  const subtotal =
    cake.price + (selectedFrame?.price ?? 0) + (selectedBouquet?.price ?? 0);
  const discountAmount = cake.price - getDiscountedPrice(cake.price);
  const discountedTotal = subtotal - discountAmount;
  const orderMessage = createWebsiteOrderMessage(cake, frameSize, bouquetSize);

  return (
    <div className="mt-7">
      <p className="mb-5 text-[11px] leading-[1.7] text-[#827671]">
        Make it an extra-special gift. Add a photo frame, a fresh flower bouquet,
        or both.
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
              className={`flex min-w-0 cursor-pointer flex-col overflow-hidden border transition-colors ${
                bouquetSize === bouquet.size
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

      <div className="my-[23px] mt-[23px] mb-[17px] bg-cream p-4" aria-live="polite">
        <p className="flex justify-between gap-3 text-[10px] leading-[1.6] text-[#74645f]"><span>{cake.name} (starting price)</span><span>{formatPrice(cake.price)}</span></p>
        {selectedFrame && (
          <p className="mt-2 flex justify-between gap-3 text-[10px] leading-[1.6] text-[#74645f]">
            <span>{selectedFrame.size}&quot; photo frame</span>
            <span>{formatPrice(selectedFrame.price)}</span>
          </p>
        )}
        {selectedBouquet && (
          <p className="mt-2 flex justify-between gap-3 text-[10px] leading-[1.6] text-[#74645f]">
            <span>{selectedBouquet.size} flower bouquet</span>
            <span>{formatPrice(selectedBouquet.price)}</span>
          </p>
        )}
        <p className="mt-[13px] flex justify-between gap-3 border-t border-line pt-3 text-[10px] leading-[1.6] text-[#74645f]"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></p>
        <p className="mt-2 flex justify-between gap-3 text-[10px] leading-[1.6] text-[#3f7963]">
          <span>Website discount ({WEBSITE_DISCOUNT_PERCENTAGE}% on cake)</span>
          <span>-{formatPrice(discountAmount)}</span>
        </p>
        <p className="mt-3 flex justify-between gap-3 border-t border-[#d8c9c0] pt-3 font-[Georgia,Times_New_Roman,serif] text-base text-ink">
          <strong className="font-normal">Estimated total before delivery</strong>
          <strong className="whitespace-nowrap font-normal text-rose-dark">{formatPrice(discountedTotal)}</strong>
        </p>
        <p className="mt-[10px] block text-[9px] text-[#938680]">
          Delivery fee isn&apos;t included. Share your location on WhatsApp so we can confirm the fee and add it to your final total.
          {" "}Starting-price estimate. We&apos;ll confirm the final price on WhatsApp.
          {selectedFrame && " Send us your photo in the WhatsApp chat."}
        </p>
      </div>

      <a
        className="button button-dark mt-[5px] w-full justify-between"
        href={`https://wa.me/94716091425?text=${orderMessage}`}
        target="_blank"
        rel="noreferrer"
      >
        Order on WhatsApp <span aria-hidden="true">↗</span>
      </a>
      <p className="mt-[10px] text-center text-[9px] text-[#938680]">
        Your gift selections and estimated total before delivery will be included in the message.
      </p>
    </div>
  );
}
