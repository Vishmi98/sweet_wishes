import Link from "next/link";

import { productReviews } from "@/constants/reviews";

type ProductReviewsProps = {
  productSlug: string;
};

function ReviewStars({ rating, label }: { rating: number; label: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          className={rating >= index + 0.5 ? "text-[#c58a46]" : "text-[#d9cec4]"}
          key={index}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function ProductReviews({ productSlug }: ProductReviewsProps) {
  const reviews = productReviews[productSlug] ?? [];

  // Return null immediately if there are no reviews at all
  if (reviews.length === 0) {
    return null;
  }

  const verifiedReviews = reviews.filter((review) => !review.isExample);
  const exampleReviews = reviews.filter((review) => review.isExample);
  const averageRating =
    verifiedReviews.length === 0
      ? 0
      : verifiedReviews.reduce((total, review) => total + review.rating, 0) /
      verifiedReviews.length;
  const formattedAverage = averageRating.toFixed(1);

  return (
    <section
      className="mx-auto max-w-[1160px] px-[10.2%] py-[68px] max-[1000px]:px-[7%] max-[700px]:py-[52px]"
      id="reviews"
      aria-labelledby="product-reviews-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-5 border-b border-line pb-6">
        <div>
          <p className="eyebrow mb-3"><span /> Customer feedback</p>
          <h2
            className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(32px,4vw,46px)] font-normal tracking-[-.045em]"
            id="product-reviews-heading"
          >
            Reviews for this <em className="font-normal text-rose">cake.</em>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <ReviewStars
            rating={averageRating}
            label={
              verifiedReviews.length
                ? `${formattedAverage} out of 5 stars`
                : "No verified ratings yet"
            }
          />
          <span className="text-[11px] text-[#827671]">
            {verifiedReviews.length
              ? `${formattedAverage} · ${verifiedReviews.length} ${verifiedReviews.length === 1 ? "review" : "reviews"}`
              : "No verified reviews yet"}
          </span>
        </div>
      </div>

      {verifiedReviews.length > 0 ? (
        <ul className="m-0 grid list-none grid-cols-2 gap-5 p-0 pt-7 max-[700px]:grid-cols-1">
          {verifiedReviews.map((review, index) => (
            <li className="border border-line bg-white p-5" key={`${review.name}-${review.date}-${index}`}>
              <div className="flex items-center justify-between gap-3">
                <ReviewStars
                  rating={review.rating}
                  label={`${review.rating} out of 5 stars`}
                />
                <time className="text-[9px] text-[#938680]">{review.date}</time>
              </div>
              <h3 className="mt-4 mb-2 font-[Georgia,Times_New_Roman,serif] text-xl font-normal">
                {review.title}
              </h3>
              <p className="m-0 text-[11px] leading-[1.8] text-[#766c68]">
                {review.comment}
              </p>
              <p className="mt-4 mb-0 text-[10px] text-[#827671]">
                {review.name}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-9 text-center">
          <ReviewStars rating={0} label="No verified ratings yet" />
          <p className="mt-3 mb-0 font-[Georgia,Times_New_Roman,serif] text-lg">
            No customer reviews yet.
          </p>
          <p className="mt-2 mb-0 text-[11px] text-[#827671]">
            Verified customer ratings and reviews will appear here.
          </p>
        </div>
      )}

      {exampleReviews.length > 0 && (
        <div className="mt-7 border border-dashed border-[#d7aaa5] bg-[#fff8f5] p-5">
          <p className="m-0 text-[10px] font-semibold uppercase tracking-[.1em] text-rose-dark">
            Example reviews · preview only
          </p>
          <p className="mt-2 mb-0 text-[11px] leading-[1.7] text-[#766c68]">
            These sample reviews are placeholders to preview the design. They are
            not real customer feedback and are not included in the rating above.
          </p>
          <ul className="mt-4 grid list-none grid-cols-2 gap-5 p-0 max-[700px]:grid-cols-1">
            {exampleReviews.map((review, index) => (
              <li
                className="border border-line bg-white p-5"
                key={`${review.title}-${index}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <ReviewStars
                    rating={review.rating}
                    label={`Example: ${review.rating} out of 5 stars`}
                  />
                  <span className="text-[9px] text-[#938680]">Example</span>
                </div>
                <h3 className="mt-4 mb-2 font-[Georgia,Times_New_Roman,serif] text-xl font-normal">
                  {review.title}
                </h3>
                <p className="m-0 text-[11px] leading-[1.8] text-[#766c68]">
                  {review.comment}
                </p>
                <p className="mt-4 mb-0 text-[10px] text-[#827671]">
                  {review.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link className="text-link text-rose-dark" href="/shop">
          Explore more cakes <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}