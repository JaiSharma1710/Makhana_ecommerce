export type LandingSlug = "office-snacks" | "student-snacks" | "delhi";

export type LandingPageData = {
  slug: LandingSlug;
  eyebrow: string;
  h1: string;
  intro: string[];
  title: string;
  description: string;
  sections: Array<{
    heading: string;
    body?: string[];
    cards?: Array<{ title: string; body: string[] }>;
    table?: string[][];
    chips?: string[];
  }>;
  faqs: string[][];
  links: Array<{ href: string; label: string }>;
};

export const landingPages: Record<LandingSlug, LandingPageData> = {
  "office-snacks": {
    slug: "office-snacks",
    eyebrow: "Desk snacking",
    h1: "Best Healthy Office Snacks to Keep in Your Desk Drawer in India",
    title: "Best Healthy Office Snacks for Your Desk Drawer | India",
    description:
      "Eight practical healthy office snacks for Indian desk jobs, from roasted makhana and chana to nuts and fruit, plus what to look for on the label.",
    intro: [
      "The Indian office snack problem usually arrives between 4 and 5 pm. Lunch is behind you, dinner is far away, chai is nearby, and biscuits, chips, samosa or namkeen start looking like the easiest answer.",
      "The best healthy office snacks in India are not complicated. They are snacks that can sit in a desk drawer, survive a commute, avoid mess on a keyboard, and give you enough portion control that the break does not become an accidental meal."
    ],
    sections: [
      {
        heading: "Why Most Office Snacks Fail You",
        body: [
          "Office snacks fail when they solve convenience but ignore how people actually work. A fried snack can feel perfect for two minutes and then feel heavy during the next call. Biscuits are easy with tea, but many people eat them because they are available, not because they are satisfying.",
          "Mess matters too. Snacks that leave oil, masala dust or crumbs on your desk are harder to eat during a workday. Portion control matters even more. If a packet stays open beside your laptop, 5 pm snack cravings can turn into repeated bites without much attention.",
          "For working professionals, healthy office snacks should be easy to portion, simple to store, and enjoyable enough that they do not feel like punishment. That is the useful middle ground between strict diet food and the default office snack pile."
        ]
      },
      {
        heading: "8 Healthy Office Snacks That Actually Work at an Indian Desk",
        cards: [
          { title: "Roasted makhana", body: ["Roasted makhana, also called fox nuts or phool makhana, is light, crunchy and desk-friendly. Khao Better Classic Roasted Makhana is pre-launch, shown as a 25 g pack priced at Rs. 59 and currently out of stock, so the site is for waitlist interest rather than ordering. For people asking makhana vs chips which is better for office snacking, the honest answer is to compare portion, preparation and label rather than assume every packet is the same."] },
          { title: "Roasted chana", body: ["Roasted chana is compact, affordable and easy to keep in a drawer. It works well when you want a crunchy snack with more bite than biscuits. Choose simpler salted or plain versions when possible, and pour a small bowl instead of eating directly from a large pouch."] },
          { title: "Almonds", body: ["Almonds are convenient and portable, but portion size is important because nuts are energy-dense. A small handful can work well during a desk job. Keep them in a small container so the serving is decided before the workday gets busy."] },
          { title: "Roasted peanuts", body: ["Roasted peanuts are familiar, budget-friendly and satisfying. They can be a useful alternative to fried namkeen when portioned carefully. Pick packs with clear ingredients and watch sodium if you snack on them daily."] },
          { title: "Dark chocolate", body: ["Dark chocolate can satisfy a sweet craving without turning tea time into a full dessert break. Keep it to a small square or two and treat it as a flavour note, not the whole snack. It pairs well with nuts or fruit."] },
          { title: "Fresh fruit", body: ["Bananas, apples, oranges and guavas are practical office snacks when storage allows. They are not drawer snacks for weeks, but they work well for the day. Fruit is also one of the cleanest answers to what to snack on during work without gaining weight, because it brings freshness and a clear portion."] },
          { title: "Khakhra", body: ["Khakhra is crisp, flat and easy to carry. It gives the crunch many people want with chai, and it can be less messy than chips. Flavoured khakhra varies a lot, so check oil, sodium and ingredient lists."] },
          { title: "Trail mix", body: ["Trail mix can be excellent or chaotic depending on what is inside. A mix of nuts, seeds and a little dried fruit can work; a mix loaded with sweet pieces can become candy in disguise. Keep the portion small and pre-packed."] }
        ]
      },
      {
        heading: "What to Look For on the Label",
        body: [
          "Start with serving size. A snack can look reasonable per serving while the actual packet contains multiple servings. Then look at added sugar, total fat, fibre, protein, ingredients and sodium.",
          "Low calorie snacks for office are useful only when the portion is realistic. Protein snacks for office can help some people feel more satisfied, but the label still matters. A healthy alternative to biscuits at office should be easy to understand, not just wrapped in healthy-sounding words."
        ]
      },
      {
        heading: "Roasted Makhana vs Chips vs Biscuits at Your Desk",
        body: ["This comparison avoids invented competitor nutrition numbers. Use it as a practical office-snack lens, then read the actual pack label."],
        table: [
          ["Factor", "Roasted makhana", "Chips", "Biscuits"],
          ["Preparation", "Often roasted; check product label", "Often fried or oil-rich", "Baked, recipes vary widely"],
          ["Mess", "Usually low-mess when lightly seasoned", "Can leave oil or masala on fingers", "Can leave crumbs"],
          ["Portion control", "Works well in small packs", "Large packets are easy to overeat", "Tea-time portions creep up quickly"],
          ["Portability", "Good for drawers and bags", "Good, but packets crush easily", "Very portable"],
          ["Crunch", "Light, airy crunch", "Dense, salty crunch", "Crisp or soft depending on biscuit"],
          ["Ingredient variability", "Seasoning and oil change nutrition", "Oil and salt vary by brand", "Sugar, flour and fat vary by brand"]
        ]
      },
      {
        heading: "Building a Week of Desk Snacks",
        body: [
          "A practical Monday to Friday rotation prevents snack boredom. Monday can be roasted chana, Tuesday fruit, Wednesday roasted makhana, Thursday nuts with a square of dark chocolate, and Friday khakhra or a small trail mix.",
          "For healthy snacks for work from home, the same rotation works if you keep the snack away from the kitchen counter. Decide the portion, sit back at your desk, and make the snack a real break rather than background eating."
        ]
      },
      {
        heading: "Healthy Tea-Time Snacks for Office in India",
        body: [
          "Healthy tea time snacks for office India do not have to fight chai culture. They simply need to replace the automatic biscuit plate sometimes. Roasted makhana, chana, khakhra, fruit or a small nut portion can all work with tea.",
          "The goal is not guilt free snacks for desk job employees as a slogan. The goal is a snack that feels enjoyable, does not make a mess at your desk, and still leaves you comfortable for the rest of the workday. Students planning long study days can also use the same logic in the Khao Better guide to healthy snacks for students."
        ]
      }
    ],
    faqs: [
      ["What are healthy office snacks in India?", "Useful healthy office snacks in India include roasted makhana, roasted chana, nuts, fruit, khakhra, peanuts, dark chocolate and simple trail mix."],
      ["What should I snack on during work without gaining weight?", "No snack guarantees weight control. Choose a clear portion, read the label, and pick snacks that fit your full day instead of eating from an open packet."],
      ["Is makhana a healthy tea-time snack for office?", "Roasted makhana can work well at tea time because it is crunchy and easy to portion. Check the exact product label and seasoning."],
      ["What snacks do not make a mess at your desk?", "Roasted makhana, roasted chana, nuts, whole fruit and neatly packed khakhra are usually easier to manage than oily chips or crumbly biscuits."],
      ["Can I buy Khao Better for office snacks now?", "Khao Better is pre-launch. Classic Roasted is currently out of stock and the site offers waitlist interest, not checkout."]
    ],
    links: [
      { href: "/makhana-classic-roasted", label: "Classic Roasted Makhana details" },
      { href: "/why-makhana", label: "What is roasted makhana?" },
      { href: "/blog/makhana-nutrition-facts", label: "Khao Better makhana nutrition facts" },
      { href: "/blog/makhana-vs-popcorn-vs-chips", label: "Makhana vs popcorn vs chips" },
      { href: "/student-snacks", label: "Healthy snacks for students" }
    ]
  },
  "student-snacks": {
    slug: "student-snacks",
    eyebrow: "Hostel snacking",
    h1: "Healthy Snacks for Hostel Students Under ₹100",
    title: "Healthy Snacks for Hostel Students Under ₹100 | Khao Better",
    description:
      "Ten practical healthy hostel snacks under ₹100 with no cooking required, plus study-session and late-night snack ideas for Indian students.",
    intro: [
      "Hostel snacks have to survive real student life: no full kitchen, limited budget, late-night study sessions, shared rooms, exam stress, and sometimes no fridge. The best healthy snacks for hostel students under 100 rupees are practical before they are fancy.",
      "This guide focuses on cheap healthy snacks for students in India that need little or no cooking, fit small rooms, and help you avoid depending only on fried packets or sugary options during exams."
    ],
    sections: [
      { heading: "What Makes a Good Hostel Snack", body: ["A good hostel snack should be affordable, easy to store, low-mess, portable and simple to portion. No cooking snacks for hostel life are especially useful because access to induction plates, pans or clean counters is not guaranteed.", "Long shelf life snacks for hostel rooms should also be easy to close and keep away from moisture. If a snack needs refrigeration, like curd, treat it as a same-day option only when a fridge is actually available. Prices below are typical Indian ranges and vary by city, store and pack size."] },
      {
        heading: "10 Healthy Hostel Snacks Under Rs. 100",
        cards: [
          { title: "Roasted makhana", body: ["Roasted makhana is light, crunchy and useful for exam time snacks. Khao Better Classic Roasted is listed at Rs. 59 for a 25 g pack, but it is pre-launch and currently out of stock, so students can only join the waitlist for now. Makhana for students exam snack works best when the pack is portioned before studying."] },
          { title: "Roasted chana", body: ["Roasted chana often fits Rs. 20-60 depending on pack size. It is shelf-stable, filling and easy to carry to class or the library."] },
          { title: "Peanuts", body: ["Roasted peanuts are common budget snacks under 100 rupees. Choose a small pack and avoid making a large jar your default study companion."] },
          { title: "Bananas", body: ["Bananas are usually cheap, easy to find and require no cooking. Buy one or two at a time so they do not over-ripen in the room."] },
          { title: "Apples", body: ["Apples cost more than bananas but travel well and do not need a fridge for short periods. They are a clean snack for classes or commutes."] },
          { title: "Khakhra", body: ["Khakhra is crisp, flat and hostel-friendly. Many packs fit under Rs. 100, but flavouring and oil levels vary, so read labels."] },
          { title: "Peanut butter with bread", body: ["A small peanut butter serving with bread can work when you need something more filling. Store it cleanly and keep portions sensible."] },
          { title: "Plain popcorn", body: ["Plain popcorn can be a useful study snack India option if you have access to a simple prepared pack. Buttered or caramel versions change the equation."] },
          { title: "Trail mix", body: ["Trail mix can fit under Rs. 100 in small packs. Look for nuts, seeds and dried fruit rather than chocolate-heavy mixes."] },
          { title: "Curd where refrigeration is available", body: ["Curd is practical only where refrigeration is available. Buy it fresh, eat it the same day, and do not store it unrefrigerated in a hostel room."] }
        ]
      },
      { heading: "Study Snacks That Don't Make You Sleepy", body: ["Study snacks that don't make you sleepy are usually lighter, portioned and not extremely oily or sugary. Heavy fried meals can make some students feel sluggish, especially late at night, though everyone responds differently.", "For healthy snacks for students during exams, choose something you can eat slowly without making your notes oily: roasted chana, fruit, roasted makhana, plain popcorn or a small nut portion."] },
      { heading: "Best Snacks to Keep in a Hostel Room Without a Fridge", body: ["The best snacks to keep in hostel room without fridge include roasted chana, peanuts, makhana, khakhra, plain popcorn packs, trail mix and whole fruit that can sit safely for a short period.", "Avoid stocking too many open packets. Use clips, airtight boxes or single-serve packs where possible, because hostel rooms can be humid and shared storage is rarely perfect."] },
      { heading: "Late-Night Study Snacking", body: ["A late night study snack healthy India plan should be boring in the best way: water nearby, a clear portion, and no open family pack beside the laptop. If you drink tea or coffee, be careful with timing so it does not disturb sleep.", "Keep late snacks lighter than dinner. A small fruit, roasted makhana, roasted chana or plain popcorn can feel better than a heavy fried snack during a long revision block."] },
      { heading: "Exam-Time Snack Planning", body: ["Plan exam snacks before the week begins. Keep two shelf-stable options in the room, one fresh option for the day, and one small comfort snack so you are not ordering food every night.", "For example: chana for library days, bananas before morning exams, roasted makhana for evening revision, and khakhra when you want crunch with tea. This keeps snacks for college students India realistic instead of perfect on paper."] }
    ],
    faqs: [
      ["What are healthy snacks for hostel students under 100 rupees?", "Roasted chana, peanuts, bananas, khakhra, plain popcorn, small trail mix packs and roasted makhana can often fit under Rs. 100, depending on city and store."],
      ["What snacks can I keep in a hostel room without a fridge?", "Roasted chana, peanuts, makhana, khakhra, plain popcorn and sealed trail mix are practical no-fridge snacks."],
      ["Is makhana good for students during exams?", "Roasted makhana can be a useful exam snack when portioned clearly. It is crunchy, light and easy to keep near a study desk."],
      ["Can I order Khao Better makhana now?", "Khao Better is pre-launch. Classic Roasted is currently out of stock, and the site is for waitlist interest only."],
      ["What should I avoid during late-night studying?", "Avoid very heavy fried snacks or large sugary portions if they make you feel sluggish. Choose a smaller, planned snack and keep water nearby."]
    ],
    links: [
      { href: "/makhana-classic-roasted", label: "Classic Roasted Makhana" },
      { href: "/why-makhana", label: "What is makhana?" },
      { href: "/blog/makhana-nutrition-facts", label: "Makhana nutrition facts" },
      { href: "/office-snacks", label: "Healthy office snacks" },
      { href: "/blog", label: "Khao Better Journal" }
    ]
  },
  delhi: {
    slug: "delhi",
    eyebrow: "Delhi NCR snacks",
    h1: "Healthy Evening Snacks for Delhi NCR Office Workers",
    title: "Healthy Evening Snacks for Delhi NCR Office Workers | Khao Better",
    description:
      "Explore better 5 pm snack ideas for Delhi, Gurugram and Noida offices, including roasted makhana. Khao Better is pre-launch; join the Delhi NCR waitlist.",
    intro: [
      "Delhi NCR office snacking has its own rhythm. Around 5 pm, chai appears, meetings slow down for a moment, and samosa, biscuits, namkeen or chips become the easy answer in Connaught Place, Nehru Place, Saket, Dwarka, Gurugram Cyber City, Noida Sector 62, Ghaziabad and Faridabad.",
      "This page is for people searching healthy snacks Delhi NCR, roasted makhana Delhi, or a low calorie evening snack for office workers in Delhi. Khao Better is currently pre-launch, so we are not yet offering active makhana delivery in Delhi NCR."
    ],
    sections: [
      { heading: "The 5 PM Problem in a Delhi Office", body: ["The 5 pm snack is emotional as much as practical. People want a break, something crunchy, and something that fits chai. That is why evening snacks Delhi office searches often lead to samosa, biscuits, namkeen and chips.", "Those snacks are popular for good reasons: they are familiar, available, affordable and satisfying. The question is not how to erase them. The question is how to add better swaps for days when you want crunch without feeling weighed down."] },
      { heading: "What Delhi Offices Usually Snack On", body: ["Samosa works because it is hot and filling. Biscuits work because they live beside tea. Namkeen works because it is shareable. Chips work because they are crunchy and easy to find.", "A better office snack plan respects that culture. It should still feel like a snack, not a lecture. For many teams, the useful shift is adding roasted makhana, chana, nuts, fruit or khakhra into the rotation."] },
      {
        heading: "Better Swaps That Still Feel Like a Snack",
        cards: [
          { title: "Roasted makhana", body: ["Roasted makhana gives a light crunch and is easy to portion for desk breaks. It is also known as fox nuts or phool makhana."] },
          { title: "Roasted chana", body: ["Roasted chana is affordable, shelf-stable and familiar across Indian snack routines."] },
          { title: "Nuts", body: ["Almonds or peanuts can work when portions are small and decided before snacking."] },
          { title: "Fruit", body: ["Bananas, apples and oranges bring freshness into an office snack routine."] },
          { title: "Khakhra", body: ["Khakhra keeps the crunch and chai pairing, while still needing label checks for oil and sodium."] }
        ]
      },
      { heading: "Roasted Makhana in Delhi NCR", body: ["Roasted makhana fits office desks because it is light, crunchy and easy to understand. If you are wondering where to buy roasted makhana online in Delhi, Khao Better is not the checkout answer yet; it is a pre-launch brand collecting waitlist interest.", "For people comparing buy flavoured roasted makhana online Delhi NCR options, read the label carefully. Flavouring, oil and sodium can change the snack. Khao Better Classic Roasted is listed as a 25 g pack at Rs. 59, currently out of stock."] },
      { heading: "Khao Better Delhi NCR Launch Status", body: ["Khao Better is pre-launch. We are currently collecting interest and waitlist signups from snackers who want launch updates.", "That includes people in Delhi, Gurugram, Noida, Ghaziabad and Faridabad, but this is not an active delivery promise. We are not publishing serviceable pincodes, delivery dates or makhana delivery Delhi timelines in this task."] },
      { heading: "Snacks for Delhi Office Teams", body: ["Healthy snack delivery for offices in Delhi NCR and makhana suppliers for offices Gurgaon are real search needs, but Khao Better is not claiming corporate supply today. Office teams can still use the idea: rotate lighter crunchy snacks into the pantry instead of relying only on samosa and biscuits.", "For an alternative to samosa at 5 pm Delhi office, try roasted makhana, roasted chana, fruit bowls, nuts, khakhra or plain popcorn. The best option is the one your team will actually eat and portion sensibly."] },
      { heading: "Delhi NCR Areas Mentioned", chips: ["Connaught Place", "Nehru Place", "Saket", "Dwarka", "Gurugram Cyber City", "Noida Sector 62", "Ghaziabad", "Faridabad"] }
    ],
    faqs: [
      ["Where can I buy roasted makhana online in Delhi?", "Khao Better is pre-launch, so the current site offers a waitlist rather than checkout for roasted makhana."],
      ["Does Khao Better deliver makhana in Delhi NCR?", "Not yet. Khao Better is collecting launch interest and is not claiming active Delhi NCR delivery or serviceable pincodes."],
      ["What is a healthy alternative to samosa at 5 pm in a Delhi office?", "Roasted makhana, roasted chana, fruit, nuts, khakhra or plain popcorn can be useful swaps depending on portion and label."],
      ["Is Khao Better available in Gurugram or Noida?", "Khao Better is pre-launch. People in Gurugram, Noida and other NCR areas can join the waitlist for updates, but ordering is not active."],
      ["Can offices request Khao Better for teams?", "Teams can express interest through the waitlist, but Khao Better is not claiming active corporate supply yet."]
    ],
    links: [
      { href: "/office-snacks", label: "Healthy office snacks in India" },
      { href: "/makhana-classic-roasted", label: "Classic Roasted Makhana" },
      { href: "/why-makhana", label: "What is makhana?" },
      { href: "/blog/makhana-nutrition-facts", label: "Makhana nutrition facts" },
      { href: "/shop", label: "Khao Better flavours" }
    ]
  }
};
