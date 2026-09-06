export type ProductStatus = "out-of-stock" | "coming-soon";

export type Product = {
  id: string;
  name: string;
  tint: string;
  badge: string;
  tag: string;
  desc: string;
  status: ProductStatus;
  packSize?: string;
  price?: number;
};

export const images: Record<string, string> = {
  classic: "/assets/p-classic.png",
  peri: "/assets/p-peri.png",
  pudina: "/assets/p-pudina.png",
  achari: "/assets/p-achari.png",
  tomato: "/assets/p-tomato.png",
  cheese: "/assets/p-cheese.png"
};

export const catalog: Product[] = [
  {
    id: "classic",
    name: "Classic Roasted",
    tint: "#F26A2E",
    badge: "Launching soon",
    tag: "A simple roasted makhana flavour planned in a 25 g pack.",
    desc: "Classic Roasted is Khao Better's first roasted makhana flavour. The 25 g pack is priced at Rs. 59 and is currently out of stock during pre-launch.",
    status: "out-of-stock",
    packSize: "25 g",
    price: 59
  },
  {
    id: "peri",
    name: "Peri Peri",
    tint: "#D93A2B",
    badge: "",
    tag: "A chilli-forward flavour planned for a later launch.",
    desc: "Peri Peri is still in development. Notify us that you're interested and we'll share updates when this flavour is closer to launch.",
    status: "coming-soon"
  },
  {
    id: "pudina",
    name: "Pudina Punch",
    tint: "#2F7A3E",
    badge: "",
    tag: "A minty, chatpata flavour planned for a later launch.",
    desc: "Pudina Punch is still in development. Notify us that you're interested and we'll share updates when this flavour is closer to launch.",
    status: "coming-soon"
  },
  {
    id: "achari",
    name: "Achari Chatpata",
    tint: "#F2A81D",
    badge: "",
    tag: "A pickle-inspired flavour planned for a later launch.",
    desc: "Achari Chatpata is still in development. Notify us that you're interested and we'll share updates when this flavour is closer to launch.",
    status: "coming-soon"
  },
  {
    id: "tomato",
    name: "Tangy Tomato",
    tint: "#C8321F",
    badge: "",
    tag: "A tangy tomato flavour planned for a later launch.",
    desc: "Tangy Tomato is still in development. Notify us that you're interested and we'll share updates when this flavour is closer to launch.",
    status: "coming-soon"
  },
  {
    id: "cheese",
    name: "Cheese & Herb",
    tint: "#245C35",
    badge: "",
    tag: "A savoury cheese-and-herb flavour planned for a later launch.",
    desc: "Cheese & Herb is still in development. Notify us that you're interested and we'll share updates when this flavour is closer to launch.",
    status: "coming-soon"
  }
];

export const labelRows = [
  ["Product status", "Classic Roasted is not available for purchase yet."],
  ["Net quantity", "25 g pack"],
  ["Price", "Rs. 59 per pack"],
  ["Energy", "Approx. 113 kcal per 25 g pack"],
  ["Dietary fibre", "Approx. 2.6 g per 25 g pack"],
  ["Added sugar", "0 g"],
  ["Availability", "Pre-launch waitlist only"]
];

export const classicNutrition25g = [
  ["Calories", "Approx. 113 kcal"],
  ["Protein", "Approx. 1.5 g"],
  ["Carbohydrates", "Approx. 13.0 g"],
  ["Dietary fibre", "Approx. 2.6 g"],
  ["Total sugar", "Approx. 1.6 g"],
  ["Added sugar", "0 g"],
  ["Total fat", "Approx. 5.5 g"],
  ["Saturated fat", "Approx. 1.25 g"],
  ["Trans fat", "0 g"],
  ["Cholesterol", "0 mg"],
  ["Sodium", "Approx. 117 mg"]
];

export const classicNutrition100g = [
  ["Calories", "450 kcal"],
  ["Protein", "6.1 g"],
  ["Carbohydrates", "52.1 g"],
  ["Dietary fibre", "10.3 g"],
  ["Total sugar", "6.2 g"],
  ["Added sugar", "0 g"],
  ["Total fat", "21.8 g"],
  ["Saturated fat", "5 g"],
  ["Trans fat", "0 g"],
  ["Cholesterol", "0 mg"],
  ["Sodium", "469 mg"]
];

export const comboPacks = [
  ["Single pack", "1 x 25 g", "Rs. 59", ""],
  ["6-pack", "6 x 25 g", "Rs. 329", "Save Rs. 25"],
  ["12-pack", "12 x 25 g", "Rs. 629", "Save Rs. 79"],
  ["24-pack", "24 x 25 g", "Rs. 1,199", "Save Rs. 217"]
];

export const faqData = [
  [
    "What is makhana, and is it the same as fox nuts?",
    "Yes. Makhana is commonly known as fox nuts, phool makhana or lotus seeds in everyday Indian snacking conversations. Khao Better uses the term roasted makhana because it is clear for shoppers who already know the snack and for people discovering roasted fox nuts for the first time."
  ],
  [
    "Is Khao Better makhana roasted or fried?",
    "Khao Better Classic Roasted Makhana is positioned as a roasted snack, not a deep-fried snack. The product is still in pre-launch, so the website avoids ordering claims while giving you the confirmed pack size, price and nutrition profile available for Classic Roasted."
  ],
  [
    "What is the Khao Better Classic Roasted pack size?",
    "Classic Roasted Makhana is planned as a 25 g pack. That format is meant for everyday snacking moments such as a desk break, a study session or a small evening snack. The 25 g nutrition values shown on this site are derived from the supplied per-100 g profile and rounded."
  ],
  [
    "What is the price of Khao Better Classic Roasted Makhana?",
    "The verified single-pack price for Classic Roasted Makhana is Rs. 59 for a 25 g pack. The product page also shows planned stock-up pack prices for later, but orders are not open yet because Khao Better is still pre-launch."
  ],
  [
    "Can I buy Khao Better makhana right now?",
    "No. Khao Better is pre-launch and Classic Roasted is currently out of stock. The website is designed for product discovery and waitlist interest only, so there is no checkout, cart purchase flow or payment collection on the site."
  ],
  [
    "How do I get launch updates?",
    "Use the Join Waitlist or Notify Me buttons to open the pre-launch form. Khao Better will share launch updates when the waitlist opens fully."
  ]
];

export const whyMakhanaFaq = [
  [
    "What is makhana?",
    "Makhana is the familiar Indian snack many people also call fox nuts, phool makhana or lotus seeds. It is light, crunchy and often roasted before seasoning, which makes it a useful base for simple everyday snack packs."
  ],
  [
    "Is roasted makhana the same as fried namkeen?",
    "No. Roasted makhana is prepared around roasting, while many namkeen-style snacks are fried. That does not automatically make every makhana pack identical, so Khao Better shows the Classic Roasted nutrition profile clearly instead of relying on broad claims."
  ],
  [
    "Why does Khao Better talk about 25 g packs?",
    "The 25 g pack is the verified Classic Roasted format. It gives a practical way to understand the product: one small pack, Rs. 59, and approximately 113 kcal based on the supplied per-100 g nutrition profile."
  ]
];

export const productFaq = [
  [
    "Is Classic Roasted Makhana available now?",
    "No. Classic Roasted Makhana is currently out of stock while Khao Better is in pre-launch. The product page is for discovery and waitlist interest, not checkout."
  ],
  [
    "What is the price of Classic Roasted Makhana?",
    "The verified price is Rs. 59 for one 25 g pack. Multi-pack prices shown on the page are planned stock-up options for later and are not active purchase offers today."
  ],
  [
    "What are the nutrition details per 25 g pack?",
    "One 25 g pack is approximately 113 kcal with about 1.5 g protein, 13.0 g carbohydrates, 2.6 g dietary fibre, 5.5 g total fat and 0 g added sugar. These values are derived from the supplied per-100 g profile and rounded."
  ],
  [
    "Does the product contain added sugar?",
    "The supplied nutrition profile lists 0 g added sugar for Classic Roasted Makhana. The page does not make medical or weight-loss claims from that number."
  ],
  [
    "Can I pay or place an order on this website?",
    "No. Khao Better is not accepting orders or payments yet. The waitlist form is a pre-launch interface only while the brand prepares for launch."
  ]
];
