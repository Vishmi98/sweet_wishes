import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";

import { cakes } from "@/constants/data";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

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
    <Suspense fallback={<p className="product-loading">Finding your sweet thing...</p>}>
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
  const orderMessage = encodeURIComponent(
    `Hi Sweet Wishes! I'd love to order ${cake.name}.`,
  );

  return (
    <main>
      <Navbar />
      <section className="product-page">
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span>
          <Link href="/shop">Our cakes</Link><span>/</span>
          <span aria-current="page">{cake.name}</span>
        </nav>
        <div className="product-layout">
          <div className="product-visual">
            <div className="product-image">
              <Image
                src={cake.image}
                alt={cake.name}
                fill
                priority
                sizes="(max-width: 700px) 90vw, 55vw"
              />
              {cake.tag && <span className="cake-tag">{cake.tag}</span>}
            </div>
            <p className="product-image-note">A little love, in every layer.</p>
          </div>

          <div className="product-info">
            <p className="eyebrow"><span /> {cake.category} · baked fresh</p>
            <h1>{cake.name}</h1>
            <p className="product-short-description">{cake.description}</p>
            <p className="product-price">{cake.price}<span> / starting price</span></p>
            <div className="product-divider" />
            <p className="product-story">{cake.story}</p>

            <div className="product-detail-block">
              <h2>Made with</h2>
              <ul className="ingredient-list">
                {cake.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="product-detail-block perfect-for">
              <h2>A lovely fit for</h2>
              <p>{cake.perfectFor}</p>
            </div>

            <a
              className="button button-dark product-order-button"
              href={`https://wa.me/94716091425?text=${orderMessage}`}
              target="_blank"
              rel="noreferrer"
            >
              Order on WhatsApp <span aria-hidden="true">↗</span>
            </a>
            <p className="product-order-note">
              We&apos;ll help you make it just right for your occasion.
            </p>
          </div>
        </div>
      </section>

      <section className="more-cakes">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> There&apos;s always room for one more</p>
            <h2>More to <em>fall for.</em></h2>
          </div>
          <Link className="text-link" href="/shop">
            Browse all treats <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="cake-grid md:pb-20">
          {otherCakes.map((item, index) => (
            <article className="cake-card" key={item.slug}>
              <Link className="cake-photo cake-photo-link" href={`/shop/${item.slug}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 700px) 44vw, 30vw"
                />
                {item.tag && <span className="cake-tag">{item.tag}</span>}
              </Link>
              <div className="cake-details">
                <div>
                  <span className="cake-number">{String(index + 1).padStart(2, "0")}</span>
                  <h3><Link href={`/shop/${item.slug}`}>{item.name}</Link></h3>
                </div>
                <strong>{item.price}</strong>
              </div>
              <p className="cake-description">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
