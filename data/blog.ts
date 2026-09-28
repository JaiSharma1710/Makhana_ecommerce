import { classicNutrition100g, classicNutrition25g } from "@/data/store";
import { blogPostIndex, BlogPost, BlogSlug } from "@/lib/blog-posts";

export type BlogArticle = BlogPost & {
  intro?: string[];
  sections: Array<{
    heading: string;
    body: string[];
    list?: string[];
    afterList?: string[];
    table?: string[][];
    afterTable?: string[];
    callout?: string;
  }>;
  faqs: string[][];
};

export const blogArticles: BlogArticle[] = [
  {
    ...blogPostIndex["makhana-weight-loss"],
    sections: [
      {
        heading: "The Short Answer",
        body: [
          "For many adults, a 25-35 g portion of roasted makhana can fit into a calorie-controlled diet as a snack. The exact amount depends on total daily intake, preparation method, hunger, activity level and individual nutrition needs. This is general nutrition information, not medical advice.",
          "That range is useful because it is practical. It is small enough to treat as a snack, large enough to feel like a real crunchy break, and easy to measure if you are using a single-serve pack or a small bowl."
        ],
        callout: "Khao Better Classic Roasted uses a 25 g pack. Based on the supplied profile, one pack is approximately 113 kcal."
      },
      {
        heading: "How Much Makhana Should You Eat in a Day?",
        body: [
          "If your goal is weight management, the better question is not whether makhana is magic. It is whether the portion fits your day. A 25 g pack can work as one snack. A 30-35 g bowl can also work if the rest of your meals leave room for it.",
          "Eating makhana daily for weight loss can make sense for some people when it replaces a less planned snack and when the portion is controlled. It will not create weight loss by itself. Overall calorie balance, protein intake, meal quality, sleep and activity still matter.",
          "People often overeat crunchy snacks because the bowl stays open. Pre-portioning helps. If you are pouring from a large jar, measure once, put the jar away, then snack slowly.",
          "A simple way to use makhana for weight loss planning is to choose the snack slot first. For example, if you want something crunchy at 5 PM, decide whether that snack should be around 100-160 kcal, then pick the makhana portion that fits. This keeps the conversation practical instead of treating makhana as a shortcut."
        ]
      },
      {
        heading: "Roasted Makhana Calories by Portion",
        body: [
          "The numbers below are calculated from the supplied Khao Better Classic Roasted nutrition profile of 450 kcal per 100 g. They are rounded for easy reading. Other brands, sweet coatings, butter, ghee or extra oil can change the result."
        ],
        table: [
          ["Portion", "Approx. calories", "How to think about it"],
          ["25 g", "113 kcal", "One Khao Better Classic pack"],
          ["30 g", "135 kcal", "A small bowl"],
          ["35 g", "158 kcal", "A fuller snack portion"],
          ["50 g", "225 kcal", "Closer to a mini-meal snack"],
          ["100 g", "450 kcal", "Full reference amount"]
        ]
      },
      {
        heading: "Makhana Nutrition per 100 g",
        body: [
          "This is the Khao Better Classic Roasted nutrition profile, not a universal claim for every makhana brand. Use it as the reference for Khao Better Classic only."
        ],
        table: [["Nutrient", "Per 100 g"], ...classicNutrition100g]
      },
      {
        heading: "Why Portion Size Matters",
        body: [
          "Makhana feels light because the pieces are airy and crunchy. That can be helpful for snacking, but it can also make portions confusing. A big bowl can look harmless even when the calories have climbed.",
          "For weight-loss diets, portion size matters more than the snack's reputation. A carefully measured roasted makhana serving can be easier to plan than a large shared packet of fried snacks. But a heavily seasoned, oily or sweet version may not behave the same way."
          ,"A second reason portion size matters is satiety. Some people feel satisfied by the crunch and volume of roasted makhana; others need a snack with more protein. If makhana alone does not keep you satisfied, pair it thoughtfully with the rest of your meals rather than increasing the bowl without noticing."
        ]
      },
      {
        heading: "Is Roasted Makhana Good to Eat at Night?",
        body: [
          "Roasted makhana can be a reasonable night snack for some people if the portion is controlled and the seasoning suits them. The phrase is roasted makhana good for weight loss at night depends on what it replaces and how it fits into the full day.",
          "If late-night snacking usually means an unmeasured packet, switching to a 25-30 g roasted makhana portion may make the snack easier to track. If it becomes an extra snack after a full day of eating, it may not help your goal."
          ,"At night, keep seasoning in mind too. Very salty or spicy snacks can make some people feel thirsty or uncomfortable. That is personal, so the safer rule is to keep the portion moderate and pay attention to how your body responds."
        ]
      },
      {
        heading: "Preparation Can Change the Calories",
        body: [
          "Dry-roasted makhana, lightly oil-seasoned makhana, ghee roasted makhana, butter-coated makhana and sweet makhana are not the same snack nutritionally. Added fats and coatings can raise calories quickly.",
          "Does ghee roasted makhana have more calories? Usually yes, if ghee is added on top of the base snack. The exact number depends on how much ghee is used. Without a measured recipe, it is better to avoid pretending there is one exact answer."
          ,"The same caution applies to sweet makhana. Jaggery, caramel, chocolate, honey-style coatings or sugar-heavy masalas can turn a simple roasted snack into a dessert-like snack. That may still be enjoyable, but it should be counted honestly."
        ]
      },
      {
        heading: "Makhana vs Popcorn vs Chips",
        body: [
          "Makhana vs popcorn which is healthier for weight loss is not a one-line answer. Plain air-popped popcorn, roasted makhana and fried potato chips all change depending on portion size, oil, butter, seasoning and sugar coatings.",
          "For a deeper decision framework, read the Khao Better guide to makhana vs popcorn vs chips. The honest answer is to compare the actual label in your hand, not an ideal version of one snack against a worst-case version of another."
          ,"For exact Khao Better Classic label calculations, the Khao Better nutrition facts article shows 25 g, 30 g, 50 g and 100 g portions in one place."
        ]
      },
      {
        heading: "Common Portion Mistakes",
        body: [
          "The first mistake is eating directly from a large bag or jar. The second is assuming roasted automatically means unlimited. The third is forgetting that oil, ghee, cheese powders and sweet coatings can shift the nutrition.",
          "A useful habit is to decide your snack portion before you start. If you are using Khao Better Classic Roasted, one 25 g pack gives a simple reference: approximately 113 kcal, derived from the supplied 100 g profile and rounded."
          ,"The final mistake is skipping meals and expecting a snack to solve the hunger later. If you arrive at makhana extremely hungry, even a measured snack can feel too small. Plan meals first, then use makhana as a snack, not as a rescue strategy."
        ]
      }
    ],
    faqs: [
      ["Can I eat makhana daily for weight loss?", "You can include makhana daily if it fits your overall eating plan, but it does not guarantee weight loss. Portion size and total daily intake matter."],
      ["How many calories are in one bowl of makhana?", "It depends on the bowl size and preparation. Based on Khao Better Classic's profile, 30 g is approximately 135 kcal and 35 g is approximately 158 kcal."],
      ["Are roasted makhana calories per 30g serving low?", "A 30 g serving is approximately 135 kcal using the Khao Better Classic profile. Whether that is low for you depends on your daily needs."],
      ["Is makhana good for weight loss at night?", "It can fit at night if it replaces a less planned snack and the portion is controlled. It is not a weight-loss treatment."],
      ["Does ghee roasted makhana have more calories?", "It usually has more calories when ghee is added. The exact amount depends on the quantity of ghee used."],
      ["Is this medical advice?", "No. This is general nutrition information, not medical advice. Speak with a qualified professional for personal diet guidance."]
    ]
  },
  {
    ...blogPostIndex["makhana-vs-popcorn-vs-chips"],
    sections: [
      {
        heading: "The Quick Answer",
        body: [
          "Makhana, popcorn and chips can all be better or worse choices depending on preparation and portion size. Plain roasted makhana and plain air-popped popcorn are very different from heavily buttered popcorn, sweet coatings or deep-fried chips.",
          "For weight management, the useful comparison is not a generic winner. It is the snack you can portion, understand and enjoy without turning a break into an unplanned meal."
        ],
        callout: "No competitor nutrition numbers are used here because this repository does not contain verified popcorn or chip datasets."
      },
      {
        heading: "What Changes the Nutrition Most?",
        body: [
          "Portion size changes the result first. A small measured serving can fit into a day more easily than a large open packet. Added oil, ghee, butter, cheese seasoning, sugar coatings and salty masalas can change the same base snack dramatically.",
          "That is why makhana vs popcorn should be read label-first. A plain popcorn label may look very different from cinema popcorn. A roasted makhana label may look different from a sweet caramel makhana pack."
          ,"Convenience also changes behaviour. Single-serve packs can make portion control easier. Large tubs and family packs may be better value, but they need a bowl or measuring habit if your goal is mindful snacking."
        ]
      },
      {
        heading: "Roasted Makhana",
        body: [
          "Roasted makhana, also called roasted fox nuts or phool makhana, has a light crunchy texture. Khao Better Classic Roasted is a real example with a supplied profile: 450 kcal per 100 g, or approximately 113 kcal per 25 g pack.",
          "The main advantage for everyday snacking is portion clarity. A 25 g pack can make it easier to decide the snack before opening it. Khao Better is still pre-launch, so Classic Roasted is shown as out of stock rather than available for checkout."
          ,"For people new to fox nuts, the texture is part of the appeal. It is crunchy without feeling as dense as many fried snacks, which can make it useful for office drawers, evening cravings and study breaks."
        ],
        table: [["Khao Better Classic detail", "Value"], ["Pack size", "25 g"], ["Single pack price", "Rs. 59"], ["Calories", "Approx. 113 kcal per 25 g"], ["Added sugar", "0 g"], ["Current status", "Out of stock"]]
      },
      {
        heading: "Popcorn",
        body: [
          "Popcorn is not one thing. Plain air-popped popcorn, stovetop popcorn with oil, microwave butter popcorn and cinema popcorn can all behave differently. The preparation method matters as much as the grain itself.",
          "For people comparing makhana vs popcorn which is healthier for weight loss, the fairest move is to compare the exact product label and the portion you will actually eat."
          ,"Popcorn can also be very volume-friendly when prepared simply. The challenge is that many real-world popcorn occasions involve butter, cheese powders, caramel coatings or cinema-style portions. Those contexts change the comparison.",
          "If ingredient names are part of your comparison, the botanical difference between makhana and lotus seeds explains why those terms are often confused."
        ]
      },
      {
        heading: "Potato Chips",
        body: [
          "Potato chips are usually positioned as a deep-fried crunchy snack. That does not mean every chip product has the same label, but it does mean the preparation method often starts from a richer snack format.",
          "Makhana vs chips becomes more useful when you compare snack behaviour. Do you pour the chips into a bowl? Do you eat from a shared packet? Does the seasoning make you keep reaching back? Those habits matter."
          ,"For office use, chips can also be messier because of oil and seasoning on fingers. That is not a nutrition claim, but it is a real desk-snacking detail people care about."
        ]
      },
      {
        heading: "Makhana vs Popcorn for Weight-Loss Diets",
        body: [
          "For weight-loss diets, both roasted makhana and plain popcorn can fit when portioned carefully. Neither food guarantees weight loss. A snack supports a plan only when it fits the total day.",
          "Khao Better's weight-loss portion guide explains why a 25-35 g roasted makhana serving is a practical range for many adults, while still leaving room for individual needs.",
          "The real advantage of a planned snack is repeatability. If a snack is easy to measure on Monday, it is easier to repeat on Tuesday. That matters more than chasing a perfect snack category. Weight-loss diets usually fail around vague habits, not around one specific food."
        ]
      },
      {
        heading: "Makhana vs Chips for Office Snacking",
        body: [
          "Makhana vs chips which is better for office snacking depends on mess, portion control, heaviness and how you want to feel after the break. Roasted makhana has a light crunch and can be easy to portion in a small pack.",
          "Chips can be enjoyable, but large shared packets are easy to overeat at a desk. If your office snack habit needs structure, a 25 g roasted makhana pack may be easier to plan.",
          "There is also a social side to office snacking. Shared snacks disappear quickly and portions become invisible. A personal pack or a measured bowl keeps the decision with you. That is why the comparison is partly nutritional and partly behavioural."
        ]
      },
      {
        heading: "Which One Should You Choose?",
        body: [
          "Choose the snack whose label, portion and preparation match your goal. For a light desk snack, roasted makhana is worth considering. For a movie night, popcorn might make more sense. For a craving where only chips will satisfy, portion them intentionally.",
          "The better choice is the one you can enjoy honestly without inventing health claims around it."
          ,"If you want one practical rule, choose plain or lightly seasoned snacks most of the time, decide the portion before opening the pack, and keep richer snacks for moments when you genuinely want them.",
          "Use three questions before choosing: What is the portion? How was it prepared? Will I keep eating after I am satisfied? Those questions work for makhana, popcorn, chips and almost every crunchy snack."
        ]
      }
    ],
    faqs: [
      ["Is makhana healthier than popcorn?", "It depends on the specific products and preparation. Plain roasted makhana and plain popcorn can both fit into everyday snacking."],
      ["Is makhana better than chips?", "For some office snack routines, roasted makhana may be easier to portion than a large chips packet. Compare actual labels before deciding."],
      ["Can makhana help with weight loss?", "It can fit into a calorie-controlled diet, but it does not cause weight loss by itself."],
      ["Why are there no popcorn or chip numbers here?", "This repository does not include verified competitor datasets, so the article avoids inventing numbers."],
      ["Where can I see Khao Better nutrition?", "The Khao Better nutrition facts article shows the Classic Roasted 25 g, 30 g and 100 g calculations."]
    ]
  },
  {
    ...blogPostIndex["makhana-nutrition-facts"],
    sections: [
      {
        heading: "Roasted Makhana Calories per 30 g Serving",
        body: [
          "Using the supplied Khao Better Classic Roasted profile of 450 kcal per 100 g, roasted makhana calories per 30g serving are approximately 135 kcal. This is a calculated value for Khao Better Classic, not a universal number for every makhana product.",
          "A 30 g portion is useful because many people think in bowls, not labels. Still, the actual number changes if a product uses extra oil, ghee, butter, sugar coatings or richer seasoning."
          ,"This is why nutrition articles should state the source of their numbers. Khao Better can calculate 30 g because the supplied Classic Roasted profile gives a 100 g base. Without that base, exact snack math becomes guesswork."
        ],
        callout: "Formula: 450 kcal per 100 g x 0.30 = 135 kcal per 30 g."
      },
      {
        heading: "Khao Better Classic Nutrition per 25 g Pack",
        body: [
          "Khao Better Classic is planned as a 25 g pack. These values are derived from the supplied per-100 g profile and rounded for pack-level readability.",
          "A 25 g pack is useful because it translates a large nutrition panel into a real snack moment. Instead of doing math while hungry, you can see the pack-level calories, fibre, fat and sodium in one place."
        ],
        table: [["Nutrient", "Per 25 g pack"], ...classicNutrition25g]
      },
      {
        heading: "Nutrition per 100 g",
        body: [
          "The table below is the verified Khao Better Classic Roasted nutrition profile supplied for this project. It should not be treated as the profile for all roasted makhana brands.",
          "Per-100 g values are still important because they let you compare products on the same basis. If one label uses a 20 g serving and another uses 30 g, the 100 g line helps you avoid comparing two different portion sizes by mistake."
        ],
        table: [["Nutrient", "Per 100 g"], ...classicNutrition100g]
      },
      {
        heading: "How Portion Size Changes the Numbers",
        body: [
          "Portion size scales the nutrition. The table uses the Khao Better Classic profile and rounds values sensibly for everyday reading.",
          "The table is proportional math, not a new lab test for every bowl size. It is meant to help shoppers estimate common servings while understanding that the official supplied base is the 100 g profile."
        ],
        table: [
          ["Portion", "Calories", "Protein", "Carbs", "Fibre", "Fat", "Sodium"],
          ["25 g", "113 kcal", "1.5 g", "13.0 g", "2.6 g", "5.5 g", "117 mg"],
          ["30 g", "135 kcal", "1.8 g", "15.6 g", "3.1 g", "6.5 g", "141 mg"],
          ["50 g", "225 kcal", "3.1 g", "26.1 g", "5.2 g", "10.9 g", "235 mg"],
          ["100 g", "450 kcal", "6.1 g", "52.1 g", "10.3 g", "21.8 g", "469 mg"]
        ]
      },
      {
        heading: "Does Roasting Change Makhana Nutrition?",
        body: [
          "Roasting changes the eating experience: texture, crunch and how seasonings cling to the snack. The final nutrition still depends on the full recipe, including oil, ghee, salt, sugar, cheese powders and other ingredients.",
          "That is why Khao Better separates general makhana discussion from Khao Better Classic-specific nutrition facts. The label on the pack is the source that matters for a finished product.",
          "Roasting can make makhana crisp and snackable, but nutrition still comes from the complete recipe. If two roasted makhana brands use different oil levels or different seasoning blends, their panels can be different even when both say roasted."
        ]
      },
      {
        heading: "What About Flavoured Makhana?",
        body: [
          "Flavoured makhana can have different nutrition from Classic Roasted. More oil, richer seasonings or sweet coatings can change calories, fat, sugar and sodium.",
          "Khao Better's other flavours are coming soon, so this page does not invent nutrition facts for Peri Peri, Pudina Punch, Achari Chatpata, Tangy Tomato or Cheese & Herb.",
          "That distinction matters for searchers comparing fox nuts nutrition across flavours. A plain or classic flavour is often the easiest place to start, but flavoured makhana should still be judged by its own finished label."
        ]
      },
      {
        heading: "How to Read a Makhana Nutrition Label",
        body: [
          "Start with serving size. A nutrition panel may show values per 100 g, per serving, or both. Then check calories, protein, carbohydrates, dietary fibre, total fat, saturated fat, added sugar and sodium.",
          "For snacks, sodium and portion size are easy to miss. A small pack can be simple to understand, while a large bag needs more deliberate portioning.",
          "Also check whether the label is for one serving or for 100 g. Many shoppers compare two panels quickly and miss that the serving sizes are different. Put both products on the same basis before deciding.",
          "Finally, look at added sugar separately from total sugar. Total sugar can include naturally occurring sugars from ingredients, while added sugar tells you whether extra sugar has been included. Khao Better Classic's supplied nutrition profile lists 0 g added sugar."
        ]
      },
      {
        heading: "How to Use These Numbers in Real Life",
        body: [
          "Nutrition facts are most useful when they change a decision. If you want a small snack, the 25 g line is the easiest reference. If you pour a bigger bowl, the 30 g or 50 g lines help you estimate without pretending the snack is calorie-free.",
          "If you are comparing makhana with popcorn or chips, use the same portion logic. Do not compare a tiny makhana serving with a huge cinema popcorn tub, or a plain popcorn bowl with a full chips packet. Match realistic portions and then decide.",
          "For Khao Better, the current product page and shop page remain pre-launch. Classic Roasted is out of stock, and these nutrition facts are here to support understanding before checkout opens in a later business phase."
          ,"For clarity on the ingredient itself, the botanical difference between makhana and lotus seeds separates Euryale ferox from true lotus seeds."
        ]
      }
    ],
    faqs: [
      ["How many calories are in 30 g of roasted makhana?", "Using Khao Better Classic's supplied profile, 30 g is approximately 135 kcal."],
      ["How many calories are in one Khao Better Classic pack?", "One 25 g pack is approximately 113 kcal, derived from the supplied per-100 g profile and rounded."],
      ["What is the makhana protein content?", "Khao Better Classic has 6.1 g protein per 100 g, or approximately 1.5 g per 25 g pack."],
      ["Does flavoured makhana have the same nutrition?", "Not necessarily. Seasonings, oils, sweet coatings and cheese powders can change nutrition."],
      ["Are these numbers universal for all fox nuts?", "No. These numbers are for Khao Better Classic Roasted only."]
    ]
  },
  {
    ...blogPostIndex["makhana-vs-lotus-seeds"],
    intro: [
      "Search for makhana online and you will often see it described as lotus seeds, fox nuts, gorgon nuts, or even popped water-lily seeds.",
      "That creates an obvious question: are makhana and lotus seeds actually the same thing?",
      "Botanically, no.",
      "The makhana commonly roasted and eaten as a crunchy snack in India comes from a plant called Euryale ferox. True lotus seeds come from Nelumbo nucifera, the sacred lotus plant.",
      "Both grow in aquatic environments and both produce edible seeds, which helps explain why the names are often mixed up. But they are different plants and should not be treated as interchangeable names."
    ],
    sections: [
      {
        heading: "The quick difference between makhana and lotus seeds",
        body: [],
        table: [
          ["Characteristic", "Makhana", "True lotus seeds"],
          ["Botanical name", "Euryale ferox", "Nelumbo nucifera"],
          ["Plant family", "Nymphaeaceae", "Nelumbonaceae"],
          ["Common Indian name", "Makhana / phool makhana", "Lotus seed / kamal gatta depending on form and context"],
          ["Plant type", "Aquatic water-lily relative", "Sacred lotus"],
          ["Familiar food form", "Popped, light makhana", "Whole lotus seed/kernel"],
          ["Typical texture", "Light and airy once popped", "Denser seed/kernel"]
        ],
        afterTable: [
          "The distinction is not just a technicality. It helps you understand what you are actually buying, cooking and comparing."
        ]
      },
      {
        heading: "What exactly is makhana?",
        body: [
          "Makhana is produced from the seeds of Euryale ferox, an aquatic plant grown in ponds, wetlands and other still-water environments.",
          "India's Agricultural and Processed Food Products Export Development Authority, or APEDA, describes makhana as the popped expanded kernel of Euryale ferox.",
          "The hard seed goes through several processing stages before the white, puffed makhana we recognise as a snack is produced.",
          "That familiar light and crunchy form is what is often called phool makhana.",
          "You may also see makhana marketed as fox nuts, gorgon nuts or water-lily seeds. Even the terminology here is not perfectly consistent, which is one reason product labels and online articles can become confusing.",
          "The makhana nutrition facts guide explains how the familiar snack form is measured and labelled."
        ]
      },
      {
        heading: "What are true lotus seeds?",
        body: [
          "True lotus seeds come from Nelumbo nucifera, commonly known as the sacred lotus.",
          "Kew's Plants of the World Online classifies Nelumbo nucifera separately from Euryale ferox. Lotus belongs to the Nelumbonaceae family, whereas Euryale ferox belongs to Nymphaeaceae.",
          "Lotus seeds have a long culinary history in several Asian cuisines. The seeds and rhizomes of the sacred lotus are both used as food.",
          "So lotus seeds are absolutely real edible seeds.",
          "They simply aren't the botanical source of the phool makhana sitting in your snack bowl."
        ]
      },
      {
        heading: "Why do people call makhana “lotus seeds”?",
        body: [
          "This is where most of the confusion begins.",
          "Both plants are aquatic. Both produce edible seeds. Both have been used in Asian food traditions for a long time.",
          "And over time, “lotus seed” became a convenient English-language label for makhana, even though it isn't botanically accurate.",
          "APEDA notes that makhana is often referred to as lotus seed but describes the terminology as misleading because Euryale ferox is not the true lotus plant.",
          "That explains why you may see two apparently contradictory statements online:",
          "“Makhana is lotus seed.”",
          "and",
          "“Makhana is not lotus seed.”",
          "The first reflects common naming and retail usage.",
          "The second reflects botany.",
          "For a simple everyday snack conversation, people may understand what you mean when you say lotus seeds. But if you are comparing ingredients, nutrition or plant sources, the distinction matters."
        ]
      },
      {
        heading: "Is makhana just a popped lotus seed?",
        body: [
          "Not if by “lotus seed” you mean the seed of Nelumbo nucifera.",
          "Phool makhana is produced by processing and popping seeds from Euryale ferox.",
          "That means this commonly repeated explanation—",
          "lotus seed → roast it → it becomes makhana",
          "—is too simplistic and botanically incorrect.",
          "The difference starts with the plant itself, not merely with the method of preparation."
        ]
      },
      {
        heading: "How can you tell what you're buying?",
        body: [
          "You do not need to become a botanist in the snack aisle.",
          "Look for the ingredient or botanical description.",
          "If the product identifies the ingredient as:",
          "Euryale ferox",
          "you are looking at makhana.",
          "If it identifies:",
          "Nelumbo nucifera",
          "you are looking at true lotus seed.",
          "For ordinary flavoured or roasted makhana packs in India, the finished product is normally obvious from its familiar white, expanded shape.",
          "The botanical name becomes more useful when shopping online, reading imported product labels or comparing recipes from different Asian cuisines.",
          "The guide to what makhana is gives more context on the snack and its familiar form.",
          "See Khao Better Classic Roasted product details for a current product example."
        ]
      },
      {
        heading: "Do makhana and lotus seeds have the same nutrition?",
        body: [
          "They should not automatically be treated as nutritionally identical because they come from different plants.",
          "There is another complication: nutrition can change depending on whether you are comparing raw seeds, dried seeds, popped makhana or a ready-to-eat roasted product containing oil and seasoning.",
          "That makes many online “makhana vs lotus seed” nutrition tables misleading because they may compare two foods in completely different forms.",
          "The safer approach is to compare the nutrition label of the actual product and serving size you intend to eat.",
          "The makhana vs popcorn vs chips guide applies the same product-and-portion approach to familiar crunchy snacks."
        ]
      },
      {
        heading: "What should we call makhana in English?",
        body: [
          "For Indian consumers, makhana is already the clearest term.",
          "Internationally, you may encounter:"
        ],
        list: ["gorgon nut", "fox nut", "popped water-lily seed", "lotus seed"],
        afterList: [
          "Of those, “lotus seed” is the one most likely to create botanical confusion.",
          "Using makhana (Euryale ferox) is the clearest option when precision matters."
        ]
      },
      {
        heading: "So, are makhana and lotus seeds the same?",
        body: [
          "No — not botanically.",
          "Makhana comes from Euryale ferox.",
          "True lotus seeds come from Nelumbo nucifera.",
          "They are both seeds from aquatic plants, and years of common naming have blurred the distinction. That is why “lotus seeds” still appears on websites, recipes and packaging connected with makhana.",
          "But if someone asks, “Is makhana actually a lotus seed?”, the technically correct answer is:",
          "Makhana is the popped seed of Euryale ferox, not the true lotus plant Nelumbo nucifera.",
          "And now you have one less confusing snack fact to Google at 11 PM."
        ]
      }
    ],
    faqs: [
      ["Is makhana the same as lotus seed?", "No. Makhana comes from Euryale ferox, while true lotus seeds come from Nelumbo nucifera. The term “lotus seed” is nevertheless commonly used for makhana in everyday trade and online content."],
      ["Is makhana a water-lily seed?", "Yes. Euryale ferox belongs to Nymphaeaceae, the water-lily family."],
      ["What is the botanical name of makhana?", "The botanical name of makhana is Euryale ferox Salisb."],
      ["What is the botanical name of true lotus?", "The sacred or true lotus discussed here is Nelumbo nucifera Gaertn."],
      ["Why is makhana called lotus seed?", "It is a common trade and everyday name, reinforced by the fact that both plants grow in aquatic environments. Botanically, however, Euryale ferox and Nelumbo nucifera are different plants."]
    ]
  }
];

export const blogIndex = blogArticles.reduce<Record<BlogSlug, BlogArticle>>((acc, article) => {
  acc[article.slug] = article;
  return acc;
}, {} as Record<BlogSlug, BlogArticle>);
