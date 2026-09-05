export type Product = {
  id: string;
  name: string;
  tint: string;
  rating: string;
  reviews: number;
  badge: string;
  tag: string;
  desc: string;
  sold: boolean;
};

export const price = 49;
export const mrp = 59;

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
    rating: "4.8",
    reviews: 120,
    badge: "Bestseller",
    tag: "Just makhana, cold-pressed oil and a whisper of pink salt.",
    desc: "Our purest pack. Lotus seeds roasted till they shatter, seasoned with nothing but Himalayan pink salt - the one everybody comes back to.",
    sold: false
  },
  {
    id: "peri",
    name: "Peri Peri",
    tint: "#D93A2B",
    rating: "4.7",
    reviews: 96,
    badge: "",
    tag: "African bird's eye chilli with a slow, buildable heat.",
    desc: "Bird's eye chilli, garlic and a squeeze of lime powder. Hot enough to notice, never hot enough to stop.",
    sold: true
  },
  {
    id: "pudina",
    name: "Pudina Punch",
    tint: "#2F7A3E",
    rating: "4.7",
    reviews: 88,
    badge: "",
    tag: "Real mint, black salt and a chaat-stall finish.",
    desc: "Sun-dried mint leaves, kala namak and amchur - the flavour of a Delhi chaat counter, minus the deep fryer.",
    sold: true
  },
  {
    id: "achari",
    name: "Achari Chatpata",
    tint: "#F2A81D",
    rating: "4.8",
    reviews: 74,
    badge: "New",
    tag: "Mustard, fennel and nigella, straight out of the pickle jar.",
    desc: "A five-spice achari masala built on mustard, saunf and kalonji. Tangy, warm and unapologetically Indian.",
    sold: true
  },
  {
    id: "tomato",
    name: "Tangy Tomato",
    tint: "#C8321F",
    rating: "4.6",
    reviews: 69,
    badge: "",
    tag: "Sun-dried tomato and a bright hit of tamarind.",
    desc: "Sun-dried tomato powder with tamarind and a pinch of jaggery. The nostalgic one - for anyone raised on tomato-flavoured everything.",
    sold: true
  },
  {
    id: "cheese",
    name: "Cheese & Herb",
    tint: "#245C35",
    rating: "4.8",
    reviews: 82,
    badge: "Kids love it",
    tag: "Aged cheddar, oregano and parsley. Gently addictive.",
    desc: "Real aged cheddar powder, oregano and parsley. Creamy, savoury and the fastest way to convert a chips loyalist.",
    sold: true
  }
];

export const labelRows = [
  ["Ingredients", "Makhana (lotus seed) 96%, cold-pressed sunflower oil, Himalayan pink salt."],
  ["Allergen information", "Contains no declared allergen. May contain traces of milk and mustard (shared equipment)."],
  ["Net quantity", "25 g"],
  ["MRP", "Rs 59 inclusive of all taxes - selling price Rs 49"],
  ["Best before", "9 months from date of packaging, unopened"],
  ["Storage", "Store in a cool, dry place away from direct sunlight. Reseal after opening."],
  ["FSSAI licence no.", "10023456789012"],
  ["Marketed by", "Khao Better Foods Pvt. Ltd., Unit 14, Industrial Area, Patna, Bihar 800001"],
  ["Country of origin", "India"],
  ["Customer care", "care@khaobetter.in - 1800 123 4567 (Mon-Sat, 10 AM-6 PM)"]
];

export const faqData = [
  ["What is makhana, and is it the same as fox nuts?", "Yes - makhana, fox nut, phool makhana and lotus seed all describe the same thing: the seed of Euryale ferox, a water lily grown in ponds across north Bihar."],
  ["Is Khao Better makhana roasted or fried?", "Dry-roasted. Every batch goes through a rotary drum at roughly 140°C, then gets tumbled with cold-pressed oil and ground spices for under a minute so the seasoning sticks."],
  ["What are the ingredients, and are there any additives?", "Classic Roasted contains makhana, cold-pressed sunflower oil and Himalayan pink salt. No added sugar, artificial colour, artificial flavour, maltodextrin or preservative."],
  ["What is the nutritional information per pack?", "Per 25 g pack: 113 kcal energy, 1.5 g protein, 13.0 g carbohydrate, 2.6 g dietary fibre, 5.5 g total fat, 0 g trans fat and 117 mg sodium."],
  ["Are there allergens, and is it gluten free?", "Classic Roasted contains no gluten-bearing ingredient. Cheese & Herb contains milk. All variants are produced on shared equipment that also handles milk and mustard."],
  ["How long does a pack stay fresh and crunchy?", "Best before nine months from the date of packaging when stored unopened in a cool, dry place away from direct sunlight. Once opened, finish within three days."],
  ["What does a 25 g pack cost, and what does shipping cost?", "Classic Roasted is Rs 49 per 25 g pack, MRP Rs 59. Shipping is Rs 49 flat and free on orders above Rs 299. Code KHAOBETTER8 takes 8% off carts above Rs 249."],
  ["Where do you deliver, and how quickly?", "All-India delivery. Orders placed before 2 PM on a working day are dispatched the same day. Metro pincodes typically receive in 2 days and the rest of India in 3-5 working days."]
];
