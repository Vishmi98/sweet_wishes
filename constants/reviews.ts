export type ProductReview = {
  name: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  isExample: boolean;
};

export const productReviews: Record<string, ProductReview[]> = {
  "birthday-motorcycle-cake": [
    {
      name: "Sample reviewer",
      date: "Preview",
      rating: 5,
      title: "A fun birthday surprise",
      comment:
        "Sample review text: the custom theme made this cake feel personal, and everyone loved sharing it.",
      isExample: false,
    },
    {
      name: "Sample reviewer",
      date: "Preview",
      rating: 4,
      title: "Lovely details",
      comment:
        "Sample review text: the decorations were a lovely finishing touch for a special celebration.",
      isExample: false,
    },
  ],
  "pink-flower-birthday-cake": [
    {
      name: "Sample reviewer",
      date: "Preview",
      rating: 5,
      title: "So pretty for the occasion",
      comment:
        "Sample review text: the soft pink flowers made a beautiful centrepiece for our birthday table.",
      isExample: false,
    },
    {
      name: "Sample reviewer",
      date: "Preview",
      rating: 4,
      title: "A sweet celebration cake",
      comment:
        "Sample review text: the cake looked lovely and was a delightful treat to share.",
      isExample: false,
    },
  ],
  "blue-dad-celebration-cake": [
    {
      name: "Sample reviewer",
      date: "Preview",
      rating: 5,
      title: "A thoughtful surprise",
      comment:
        "Sample review text: the personalized design helped make our family celebration feel extra special.",
      isExample: false,
    },
    {
      name: "Sample reviewer",
      date: "Preview",
      rating: 4,
      title: "Personal and delicious",
      comment:
        "Sample review text: we loved the custom message and enjoyed sharing the cake together.",
      isExample: false,
    },
  ],
  "chocolate-cookie-drip-cake": [
    {
      name: "Sample reviewer",
      date: "Preview",
      rating: 5,
      title: "A chocolate lover's dream",
      comment:
        "Sample review text: the chocolate toppings made this a fun and indulgent choice for dessert.",
      isExample: false,
    },
    {
      name: "Sample reviewer",
      date: "Preview",
      rating: 4,
      title: "Perfect for sharing",
      comment:
        "Sample review text: everyone found a favorite topping, and it disappeared quickly from the table.",
      isExample: false,
    },
  ],
};
