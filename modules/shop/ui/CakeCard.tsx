import Image from "next/image";
import Link from "next/link";

import type { cakes } from "@/constants/data";

type Cake = (typeof cakes)[number];

type CakeCardProps = {
  cake: Cake;
  index: number;
};

export default function CakeCard({ cake, index }: CakeCardProps) {
  const orderMessage = encodeURIComponent(
    `Hi Sweet Wishes! I'd love to order ${cake.name}.`,
  );

  return (
    <article className="cake-card">
      <div className="cake-photo">
        <Link
          className="cake-photo-link"
          href={`/shop/${cake.slug}`}
          aria-label={`View ${cake.name}`}
        >
          <Image
            src={cake.image}
            alt={cake.name}
            fill
            sizes="(max-width: 700px) 44vw, (max-width: 1000px) 43vw, 22vw"
          />
        </Link>
        {cake.tag && <span className="cake-tag">{cake.tag}</span>}
      </div>
      <div className="cake-details">
        <div>
          <span className="cake-number">{String(index + 1).padStart(2, "0")}</span>
          <h3>
            <Link href={`/shop/${cake.slug}`}>{cake.name}</Link>
          </h3>
        </div>
        <strong>{cake.price}</strong>
      </div>
      <p className="cake-description">{cake.description}</p>
      <div className="cake-card-actions">
        <Link className="cake-view-link" href={`/shop/${cake.slug}`}>
          View details <span aria-hidden="true">↗</span>
        </Link>
        <a
          className="cake-order-link"
          href={`https://wa.me/94716091425?text=${orderMessage}`}
          target="_blank"
          rel="noreferrer"
          aria-label={`Order ${cake.name} on WhatsApp`}
        >
          WhatsApp order
        </a>
      </div>
    </article>
  );
}
