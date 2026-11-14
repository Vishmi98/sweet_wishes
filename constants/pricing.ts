export const WEBSITE_DISCOUNT_PERCENTAGE = 10;

export const DISCOUNTED_CAKE_SLUGS: readonly string[] = [
  "classic-white-bride-to-be-cake",
  "3rd-anniversary-celebration-cake",
  "mr-and-mrs-romantic-cake",
  // "strawberry-basket-celebration-cake",
  // "3rd-anniversary-celebration-cake",
];

export function isCakeDiscounted(slug: string) {
  return DISCOUNTED_CAKE_SLUGS.includes(slug);
}

export const photoFrameOptions = [
  { size: "8 x 12", price: 1800 },
  { size: "10 x 12", price: 2000 },
  { size: "10 x 15", price: 2200 },
  { size: "12 x 15", price: 2500 },
  { size: "12 x 18", price: 3000 },
] as const;

export const flowerBouquetOptions = [
  {
    size: "Small1",
    price: 1800,
    image: "/b1.png",
    imageAlt: "Small roses flower bouquet",
  },
  {
    size: "Small2",
    price: 2000,
    image: "/b4.png",
    imageAlt: "Small roses flower bouquet",
  },
  {
    size: "Medium",
    price: 2500,
    image: "/b2.png",
    imageAlt: "Medium mix flower bouquet",
  },
  {
    size: "Large1`",
    price: 2800,
    image: "/b6.png",
    imageAlt: "Large mix flower bouquet",
  },
  {
    size: "Large",
    price: 5500,
    image: "/b5.png",
    imageAlt: "Large roses flower bouquet",
  },
] as const;

export function getDiscountedPrice(price: number, isEligible: boolean) {
  return isEligible ? price * (1 - WEBSITE_DISCOUNT_PERCENTAGE / 100) : price;
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
  "Hi Sweet Wishes! I'd like to place an order through your website. Please help me with my order.",
);

export function createWebsiteOrderMessage(product: {
  slug: string;
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
  const isEligible = isCakeDiscounted(product.slug);
  const discount = product.price - getDiscountedPrice(product.price, isEligible);
  const estimatedTotal = subtotal - discount;
  const selectedItems = [
    selectedFrame
      ? `- Photo frame (${selectedFrame.size} inches): ${formatPrice(framePrice)}`
      : "",
    selectedBouquet
      ? `- Flower bouquet: ${formatPrice(bouquetPrice)}`
      : "",
  ].filter(Boolean);

  return encodeURIComponent(
    [
      "Hi Sweet Wishes! I'd like to place this order:",
      "",
      "ORDER DETAILS",
      `- Cake: ${product.name}`,
      `- Cake starting price: ${formatPrice(product.price)}`,
      ...selectedItems,
      "",
      "PRICE BREAKDOWN",
      `- Subtotal: ${formatPrice(subtotal)}`,
      isEligible
        ? `- Selected-cake discount (${WEBSITE_DISCOUNT_PERCENTAGE}%): -${formatPrice(discount)}`
        : "",
      `- Estimated total before delivery: ${formatPrice(estimatedTotal)}`,
      "",
      "DELIVERY",
      "Delivery fee is not included. I will share my location so you can confirm availability and the delivery fee.",
      selectedFrame ? "I will send the photo for the frame in this WhatsApp chat." : "",
      "",
      "Please confirm the cake details and final total.",
    ].join("\n"),
  );
}
