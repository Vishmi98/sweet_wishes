export type CustomerReview = {
  orderNumber: string;
  name: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  productName: string;
  isSample: boolean;
};

export const customerReviews: CustomerReview[] = [
  {
    orderNumber: "SW-SAMPLE-1042",
    name: "Amaya P.",
    date: "October 18, 2026",
    rating: 5,
    title: "Made the birthday feel extra special",
    comment:
      "The cake looked beautiful, and the personalized details were exactly what we hoped for. It was the sweetest surprise of the day.",
    productName: "Pink Flower Birthday Cake",
    isSample: true,
  },
  {
    orderNumber: "SW-SAMPLE-1038",
    name: "Dilan R.",
    date: "October 12, 2026",
    rating: 5,
    title: "A hit with all the chocolate lovers",
    comment:
      "Rich, delicious, and decorated so nicely. Everyone wanted to know where we got it!",
    productName: "Chocolate Cookie Drip Cake",
    isSample: true,
  },
  {
    orderNumber: "SW-SAMPLE-1031",
    name: "Nethmi S.",
    date: "October 5, 2026",
    rating: 5,
    title: "Beautiful from the first look",
    comment:
      "The elegant finish made the cake a lovely centrepiece for our celebration. It tasted just as good as it looked.",
    productName: "Classic White Bride-to-Be Cake",
    isSample: true,
  },
  {
    orderNumber: "SW-SAMPLE-1026",
    name: "Kasun M.",
    date: "September 28, 2026",
    rating: 4,
    title: "A fun surprise for a motorcycle fan",
    comment:
      "The theme came together wonderfully and made the birthday boy smile. The cake was fresh and enjoyable.",
    productName: "Birthday Motorcycle Cake",
    isSample: true,
  },
  {
    orderNumber: "SW-SAMPLE-1019",
    name: "Tharushi W.",
    date: "September 19, 2026",
    rating: 5,
    title: "A lovely anniversary centrepiece",
    comment:
      "The cake was beautifully made and added a special touch to our anniversary dinner. We would happily order again.",
    productName: "3rd Anniversary Celebration Cake",
    isSample: true,
  },
  {
    orderNumber: "SW-SAMPLE-1012",
    name: "Ravindu J.",
    date: "September 10, 2026",
    rating: 5,
    title: "Fresh, pretty, and delicious",
    comment:
      "The decorations were delicate and the cake was lovely to share with family. Ordering was easy too.",
    productName: "Pink Flower Bento Cupcake Box",
    isSample: true,
  },
];
