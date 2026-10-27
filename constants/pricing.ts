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

export type OrderFulfilment =
  | { type: "pickup" }
  | {
      type: "delivery";
      location?: { lat: number; lng: number; label: string };
      note?: string;
      distanceKm?: number;
      // Only set when the address is inside the delivery area.
      fee?: number;
    };

function getFulfilmentLines(fulfilment: OrderFulfilment | undefined, estimatedTotal: number) {
  if (fulfilment?.type === "pickup") {
    return [
      `Estimated total: ${formatPrice(estimatedTotal)}.`,
      "I will pick up the order from your shop.",
      "Please confirm my order and final total.",
    ];
  }

  const location = fulfilment?.location;

  if (!location) {
    return [
      `Estimated total before delivery: ${formatPrice(estimatedTotal)}.`,
      "For delivery, I will share my location here so you can confirm the delivery fee and add it to my final total.",
      "Please confirm delivery availability and my final total.",
    ];
  }

  const note = fulfilment.note?.trim();
  const lines = [
    `Deliver to: ${note ? `${note}, ${location.label}` : location.label}.`,
    // No full stop after the link, so WhatsApp keeps it clickable.
    `Location pin: https://www.google.com/maps?q=${location.lat.toFixed(6)},${location.lng.toFixed(6)}`,
  ];

  if (fulfilment.fee !== undefined && fulfilment.distanceKm !== undefined) {
    lines.push(
      `Delivery fee (${fulfilment.distanceKm} km by road): ${formatPrice(fulfilment.fee)}.`,
      `Estimated total with delivery: ${formatPrice(estimatedTotal + fulfilment.fee)}.`,
      "Please confirm delivery availability and my final total.",
    );
  } else if (fulfilment.distanceKm !== undefined) {
    lines.push(
      `Estimated total before delivery: ${formatPrice(estimatedTotal)}.`,
      `The address is about ${fulfilment.distanceKm} km away by road. Please let me know if you can deliver there and the delivery fee.`,
    );
  } else {
    lines.push(
      `Estimated total before delivery: ${formatPrice(estimatedTotal)}.`,
      "Please confirm the delivery fee for this location and my final total.",
    );
  }

  return lines;
}

export function createWebsiteOrderMessage(product: {
  name: string;
  price: number;
}, frameSize?: string, bouquetSize?: string, fulfilment?: OrderFulfilment) {
  const selectedFrame = photoFrameOptions.find((frame) => frame.size === frameSize);
  const selectedBouquet = flowerBouquetOptions.find(
    (bouquet) => bouquet.size === bouquetSize,
  );
  const framePrice = selectedFrame?.price ?? 0;
  const bouquetPrice = selectedBouquet?.price ?? 0;
  const subtotal = product.price + framePrice + bouquetPrice;
  const discount = product.price - getDiscountedPrice(product.price);
  const estimatedTotal = subtotal - discount;

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
      `Website discount (${WEBSITE_DISCOUNT_PERCENTAGE}% on cake only): -${formatPrice(discount)}.`,
      selectedFrame
        ? "I will send the photo for the frame here on WhatsApp."
        : "",
      ...getFulfilmentLines(fulfilment, estimatedTotal),
    ]
      .filter(Boolean)
      .join(" "),
  );
}
