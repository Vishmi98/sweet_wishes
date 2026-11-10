import Link from "next/link";

import { customerReviews } from "@/constants/reviews";

function ReviewStars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
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

export default function CustomerReviews() {
  const reviewCount = customerReviews.length;
  const averageRating =
    reviewCount === 0
      ? 0
      : customerReviews.reduce((total, review) => total + review.rating, 0) /
      reviewCount;

  return (
    <section
      className="mx-auto max-w-[1160px] px-[10.2%] py-[68px] max-[1000px]:px-[7%] max-[700px]:py-[48px]"
      aria-labelledby="customer-reviews-heading"
    >
      <div className="mb-9 flex flex-wrap items-end justify-between gap-5 border-b border-line pb-6">
        <div>
          <p className="eyebrow mb-3"><span /> Customer review preview</p>
          <h2
            className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(34px,4vw,48px)] font-normal tracking-[-.045em]"
            id="customer-reviews-heading"
          >
            Kind words, <em className="font-normal text-rose">shared.</em>
          </h2>
        </div>
        <div className="text-right">
          {reviewCount > 0 ? (
            <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-0">
              <p className="m-0 flex items-center justify-end gap-2 font-[Georgia,Times_New_Roman,serif] text-xl">
                <ReviewStars rating={averageRating} />
                {averageRating.toFixed(1)}
              </p>
              <p className="mt-1 mb-0 text-[10px] text-[#827671]">
                {reviewCount} sample {reviewCount === 1 ? "review" : "reviews"}
              </p>
            </div>
          ) : (
            <p className="m-0 text-[10px] text-[#827671]">
              Customer stories will appear here
            </p>
          )}
        </div>
      </div>

      {reviewCount > 0 ? (
        <>
          <ul className="m-0 grid list-none grid-cols-2 gap-5 p-0 max-[700px]:grid-cols-1">
            {customerReviews.map((review) => (
              <li
                className="border border-line bg-white p-5 max-[700px]:p-4"
                key={review.orderNumber}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <ReviewStars rating={review.rating} />
                  <div className="flex items-center gap-2 text-[9px] text-[#938680]">
                    <time>{review.date}</time>
                    {/* {review.isSample && (
                      <span className="border border-[#d7aaa5] px-1.5 py-0.5 text-rose-dark">
                        Sample
                      </span>
                    )} */}
                  </div>
                </div>
                {/* <h3 className="mt-4 mb-2 font-[Georgia,Times_New_Roman,serif] text-xl font-normal">
                  {review.title}
                </h3> */}
                <p className="mt-4 leading-[1.8] text-sm text-[#766c68]">
                  {review.comment}
                </p>
                <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-line pt-4">
                  <div>
                    <p className="m-0 text-[10px] font-medium text-ink">{review.name}</p>
                    <p className="mt-1 mb-0 text-[9px] text-[#827671]">{review.productName}</p>
                  </div>
                  <p className="m-0 text-right text-[9px] text-[#827671]">
                    {review.isSample ? "Order no." : "Order no."}{" "}
                    <span className="font-medium text-rose-dark">{review.orderNumber}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="bg-cream px-6 py-14 text-center max-[700px]:px-4 max-[700px]:py-11">
          <span className="font-[Georgia,Times_New_Roman,serif] text-3xl text-rose-dark" aria-hidden="true">“</span>
          <h3 className="mt-2 mb-0 font-[Georgia,Times_New_Roman,serif] text-2xl font-normal">
            Your kind words belong here.
          </h3>
          <p className="mx-auto mt-3 mb-0 max-w-[420px] leading-[1.8] text-[#827671]">
            We don&apos;t have any verified customer reviews to share just yet.
            Once available, each review will include its order number.
          </p>
          <Link className="text-link mt-6 text-rose-dark" href="/shop">
            Find your celebration cake
          </Link>
        </div>
      )}
    </section>
  );
}
