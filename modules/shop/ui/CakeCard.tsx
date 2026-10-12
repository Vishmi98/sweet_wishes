import Image from "next/image";
import Link from "next/link";

import type { cakes } from "@/constants/data";
import { formatPrice, getDiscountedPrice } from "@/constants/pricing";

type Cake = (typeof cakes)[number];

type CakeCardProps = {
  cake: Cake;
  index: number;
};

export default function CakeCard({ cake, index }: CakeCardProps) {
  return (
    <article className="group min-w-0">
      <div className="relative h-[clamp(190px,23vw,280px)] overflow-hidden bg-[#f1e8df] max-[1000px]:h-[320px] max-[700px]:h-[clamp(155px,49vw,260px)]">
        <Link
          className="relative block h-full w-full"
          href={`/shop/${cake.slug}`}
          aria-label={`View ${cake.name}`}
        >
          <Image
            src={cake.image}
            alt={cake.name}
            fill
            sizes="(max-width: 700px) 44vw, (max-width: 1000px) 43vw, 22vw"
            className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.045]"
          />
        </Link>
        {cake.tag && <span className="absolute top-3 left-3 bg-[rgba(255,254,250,.92)] px-[9px] py-[7px] text-[8px] tracking-[.04em] text-[#745b55] max-[700px]:top-2 max-[700px]:left-2 max-[700px]:px-[7px] max-[700px]:py-1.5 max-[700px]:text-[7px]">{cake.tag}</span>}
      </div>
      <div className="mt-[15px] flex items-baseline justify-between gap-2 max-[700px]:mt-[11px] max-[700px]:items-start">
        <div>
          <span className="mb-[5px] block text-[8px] tracking-[.08em] text-[var(--rose-dark)]">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="m-0 font-[Georgia,Times_New_Roman,serif] text-[17px] font-normal max-[700px]:block max-[700px]:text-[15px]">
            <Link href={`/shop/${cake.slug}`}>{cake.name}</Link>
          </h3>
        </div>
        <strong className="mt-0 flex flex-col items-end gap-[3px] whitespace-nowrap font-[Georgia,Times_New_Roman,serif] text-[13px] font-normal max-[700px]:mt-[13px] max-[700px]:text-xs">
          <del className="font-sans text-[10px] text-[#938680]">{formatPrice(cake.price)}</del>
          <span className="text-[var(--rose-dark)]">{formatPrice(getDiscountedPrice(cake.price))}</span>
        </strong>
      </div>
      <p className="mt-2 mb-0 text-[9px] leading-[1.6] text-[#91847e] max-[700px]:mt-1.5 max-[700px]:text-[8px]">{cake.description}</p>
      <div className="mt-3 flex items-center justify-between gap-2 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-2">
        <Link className="inline-flex items-center gap-2 text-[9px] text-[var(--rose-dark)]" href={`/shop/${cake.slug}`}>
          View details <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span>
        </Link>
        <Link
          className="whitespace-nowrap bg-[#3f7963] px-[9px] py-[7px] text-[9px] text-white transition-colors hover:bg-[#315f4e] max-[700px]:px-2 max-[700px]:text-[8px]"
          href={`/shop/${cake.slug}`}
          aria-label={`Customize ${cake.name} and choose gift add-ons`}
        >
          Choose gifts
        </Link>
      </div>
    </article>
  );
}
