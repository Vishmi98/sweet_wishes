import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";

import { cakes } from "@/constants/data";
import { formatPrice, getDiscountedPrice } from "@/constants/pricing";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProductOrderOptions from "@/modules/shop/ui/ProductOrderOptions";
import ProductReviews from "@/modules/shop/ui/ProductReviews";

type CakePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cakes.map((cake) => ({ slug: cake.slug }));
}

export async function generateMetadata({ params }: CakePageProps): Promise<Metadata> {
  const { slug } = await params;
  const cake = cakes.find((item) => item.slug === slug);

  if (!cake) {
    return { title: "Cake not found | Sweet Wishes" };
  }

  return {
    title: `${cake.name} | Sweet Wishes`,
    description: cake.story,
  };
}

export default function CakePage({ params }: CakePageProps) {
  return (
    <Suspense fallback={<p className="grid min-h-[55vh] place-items-center font-[Georgia,Times_New_Roman,serif] text-lg text-[var(--muted)]">Finding your sweet thing...</p>}>
      <CakePageContent params={params} />
    </Suspense>
  );
}

async function CakePageContent({ params }: CakePageProps) {
  const { slug } = await params;
  const cake = cakes.find((item) => item.slug === slug);

  if (!cake) {
    notFound();
  }

  const otherCakes = cakes.filter((item) => item.slug !== cake.slug).slice(0, 3);

  return (
    <main>
      <Navbar />
      <section className="px-[10.2%] pt-10 pb-[76px] max-[1000px]:px-[7%] max-[700px]:px-[7%] max-[700px]:pt-[30px] max-[700px]:pb-[54px]">
        <nav className="mb-9 flex flex-wrap items-center gap-[10px] text-[10px] text-[#938680] max-[700px]:mb-[25px] max-[700px]:gap-[7px] max-[700px]:text-[9px] [&_a:hover]:text-[var(--rose-dark)]" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span>
          <Link href="/shop">Our cakes</Link><span>/</span>
          <span aria-current="page">{cake.name}</span>
        </nav>
        <div className="mx-auto grid max-w-[1160px] grid-cols-[1.05fr_.95fr] items-start gap-[clamp(45px,8vw,110px)] max-[1000px]:gap-[38px] max-[700px]:grid-cols-1 max-[700px]:gap-[23px]">
          <div>
            <div className="relative min-h-[500px] overflow-hidden bg-[#f1e8df] max-[1000px]:min-h-[410px] max-[700px]:min-h-[clamp(280px,90vw,460px)]">
              <Image
                src={cake.image}
                alt={cake.name}
                fill
                priority
                sizes="(max-width: 700px) 90vw, 55vw"
                className="object-cover"
              />
              {cake.tag && <span className="absolute top-[18px] left-[18px] bg-[rgba(255,254,250,.92)] px-3 py-[9px] text-[9px] tracking-[.04em] text-[#745b55]">{cake.tag}</span>}
            </div>
            <p className="mt-3 text-right font-[Georgia,Times_New_Roman,serif] text-xs italic text-[#938680]">A little love, in every layer.</p>

            {/* reviews display and can add review */}
          </div>

          <div className="py-3 max-[700px]:pt-[3px]">
            <p className="eyebrow mb-[15px]"><span /> {cake.category} · baked fresh</p>
            <h1 className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(44px,4.8vw,62px)] font-normal leading-[1.05] tracking-[-.055em] max-[700px]:text-[48px]">{cake.name}</h1>
            <p className="mt-3 mb-[18px] font-[Georgia,Times_New_Roman,serif] text-base leading-[1.6] text-[#827671]">{cake.description}</p>
            <div className="my-[23px] h-px bg-[var(--line)]" />
            <p className="mb-[25px] text-xs leading-[1.9] text-[#766c68]">{cake.story}</p>

            <div className="mb-5">
              <h2 className="mb-[10px] font-[Georgia,Times_New_Roman,serif] text-[15px] font-normal">Made with</h2>
              <ul className="m-0 flex list-none flex-wrap gap-[7px] p-0">
                {cake.ingredients.map((ingredient) => (
                  <li className="bg-[var(--cream)] px-[10px] py-[7px] text-[9px] text-[#74645f]" key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <ProductOrderOptions cake={cake} />
          </div>
        </div>
      </section>

      <ProductReviews productSlug={cake.slug} />

      <section className="bg-[var(--cream)] px-[10.2%] pt-[68px] pb-[86px] max-[1000px]:px-[7%] max-[700px]:px-[7%] max-[700px]:pt-[54px] max-[700px]:pb-[65px]">
        <div className="section-heading mb-[30px] max-[700px]:mb-6 max-[700px]:block">
          <div>
            <p className="eyebrow"><span /> There&apos;s always room for one more</p>
            <h2 className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(38px,4vw,52px)] font-normal tracking-[-.05em]">More to <em className="font-normal text-[var(--rose)]">fall for.</em></h2>
          </div>
          <Link className="text-link text-[var(--rose-dark)] max-[700px]:mt-[19px]" href="/shop">
            Browse all treats <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 pb-8 min-[1001px]:grid-cols-4 md:pb-20 max-[700px]:gap-x-[13px]">
          {otherCakes.map((item, index) => (
            <article className="group min-w-0" key={item.slug}>
              <Link className="group relative block h-[clamp(190px,23vw,280px)] overflow-hidden bg-[#f1e8df] max-[1000px]:h-[320px] max-[700px]:h-[clamp(155px,49vw,260px)]" href={`/shop/${item.slug}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 700px) 44vw, 30vw"
                  className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.045]"
                />
                {item.tag && <span className="absolute top-3 left-3 bg-[rgba(255,254,250,.92)] px-[9px] py-[7px] text-[8px] tracking-[.04em] text-[#745b55]">{item.tag}</span>}
              </Link>
              <div className="mt-[15px] flex items-baseline justify-between gap-2">
                <div>
                  <span className="mb-[5px] block text-[8px] tracking-[.08em] text-[var(--rose-dark)]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="m-0 font-[Georgia,Times_New_Roman,serif] text-[17px] font-normal"><Link href={`/shop/${item.slug}`}>{item.name}</Link></h3>
                </div>
                <strong className="flex flex-col items-end gap-[3px] whitespace-nowrap font-[Georgia,Times_New_Roman,serif] text-[13px] font-normal">
                  <del className="font-sans text-[10px] text-[#938680]">{formatPrice(item.price)}</del>
                  <span className="text-[var(--rose-dark)]">{formatPrice(getDiscountedPrice(item.price))}</span>
                </strong>
              </div>
              <p className="mt-2 mb-0 text-[9px] leading-[1.6] text-[#91847e]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
