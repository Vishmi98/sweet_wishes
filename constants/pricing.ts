export const WEBSITE_DISCOUNT_PERCENTAGE = 10;

export const photoFrameOptions = [
  { size: "8 x 12", price: 1800 },
  { size: "10 x 12", price: 2000 },
  { size: "10 x 15", price: 2200 },
  { size: "12 x 15", price: 2500 },
  { size: "12 x 18", price: 3000 },
] as const;

export const flowerBouquetOptions = [
  {
    size: "Small",
    price: 1800,
    image: "/b1.png",
    imageAlt: "Small pink and peach flower bouquet",
  },
  {
    size: "Medium",
    price: 2500,
    image: "/b2.png",
    imageAlt: "Medium pink and peach flower bouquet",
  },
  {
    size: "Large",
    price: 2800,
    image: "/b3.png",
    imageAlt: "Large pink and peach flower bouquet",
  },
] as const;

export function getDiscountedPrice(price: number) {
  return price * (1 - WEBSITE_DISCOUNT_PERCENTAGE / 100);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export const GENERAL_WEBSITE_ORDER_MESSAGE = encodeURIComponent(
  "Hi Sweet Wishes! I'd like to place an order through your website and use the 10% website discount. Please help me with my order.",
);

export function createWebsiteOrderMessage(product: {
  name: string;
  price: number;
}, frameSize?: string, bouquetSize?: string) {
  const selectedFrame = photoFrameOptions.find((frame) => frame.size === frameSize);
  const selectedBouquet = flowerBouquetOptions.find(
    (bouquet) => bouquet.size === bouquetSize,
  );
  const framePrice = selectedFrame?.price ?? 0;
  const bouquetPrice = selectedBouquet?.price ?? 0;
  const subtotal = product.price + framePrice + bouquetPrice;
  const discount = subtotal - getDiscountedPrice(subtotal);

  return encodeURIComponent(
    [
      `Hi Sweet Wishes! I'd love to order ${product.name} through your website.`,
      `Cake starting price: ${formatPrice(product.price)}.`,
      selectedFrame
        ? `Photo frame (${selectedFrame.size} inches): ${formatPrice(framePrice)}.`
        : "",
      selectedBouquet
        ? `Fresh flower bouquet (${selectedBouquet.size}): ${formatPrice(bouquetPrice)}.`
        : "",
      `Subtotal: ${formatPrice(subtotal)}.`,
      `Website discount (${WEBSITE_DISCOUNT_PERCENTAGE}%): -${formatPrice(discount)}.`,
      `Estimated total: ${formatPrice(getDiscountedPrice(subtotal))}.`,
      selectedFrame
        ? "I will send the photo for the frame here on WhatsApp."
        : "",
      "Please confirm the final price for my order.",
    ]
      .filter(Boolean)
      .join(" "),
  );
}
