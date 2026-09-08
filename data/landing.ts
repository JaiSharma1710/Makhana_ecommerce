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
    h1: "Best Healthy Snacks to Keep in Your Office Drawer in India",
    title: "Best Healthy Office Drawer Snacks in India | Khao Better",
    description:
      "Practical office drawer snacks for Indian workdays, with storage, portion, mess and label tips for planning the 4–7 PM hunger window.",
    intro: [
      "For many Indian desk jobs, the difficult snack decision arrives between 4 and 7 pm. Lunch is behind you, dinner may still be hours away, chai is nearby, and biscuits, chips, samosa or namkeen can become the automatic answer.",
      "The best healthy snacks to keep in an office drawer are practical before anything else: easy to store safely at your desk when the packaging and storage instructions allow it, easy to portion, low-mess and compact enough for a desk or work bag. Fresh food can be part of the rotation too, but it needs a separate same-day plan."
    ],
    sections: [
      {
        heading: "What Makes a Good Desk-Drawer Snack?",
        body: [
          "A useful drawer snack does not require a fridge, plate or lengthy preparation. It should stay sealed until needed, fit the storage instructions on its label and be easy to close again if the pack contains more than one portion. Shelf-stable does not mean safe forever, so check the best-before date and discard damaged, stale or damp food.",
          "Portionability matters because work can make eating automatic. A small pack, a reusable container or a bowl gives the snack a clear stopping point. Minimal oil, loose powder and crumbs also make a difference when you are eating near a keyboard, documents or shared equipment."
        ]
      },
      {
        heading: "8 Practical Office Snack Ideas for an Indian Desk",
        cards: [
          { title: "Roasted makhana", body: ["Roasted makhana, also called fox nuts or phool makhana, offers a light crunch and is easy to divide into a small container. Preparation matters: plain or lightly seasoned versions can differ from heavily coated ones, so compare the actual label rather than treating every makhana pack as identical. Khao Better Classic Roasted is a 25 g pack priced at ₹59 and works out to approximately 113 kcal per pack based on its nutrition panel. It is currently out of stock during pre-launch."] },
          { title: "Roasted chana", body: ["Roasted chana is compact, sturdy in a work bag and simple to portion. Plain and seasoned versions can differ in sodium and ingredients. If you buy a larger pouch, separate one desk serving instead of leaving the whole pouch open beside the laptop."] },
          { title: "Nuts", body: ["Almonds, cashews or mixed nuts travel well and need no preparation, but they are energy-dense. A small container is more useful than an unrestricted jar because it turns a vague handful into a deliberate portion."] },
          { title: "Roasted peanuts", body: ["Roasted peanuts are familiar and widely available, with a denser bite than airy snacks. Salted, masala and coated versions vary, so check sodium, added ingredients and serving size. People with peanut allergies should choose another option and avoid shared-container cross-contact."] },
          { title: "Simple popcorn", body: ["Plain or simply seasoned popcorn can work when you want a high-volume crunchy snack, but butter, caramel and rich seasoning change the comparison. Prepared packs are convenient for a drawer; freshly made popcorn is more practical where an office pantry allows it."] },
          { title: "Fresh fruit", body: ["Bananas, apples, oranges and guavas can add a fresh option to the workday. They belong in a daily bag or suitable office storage rather than a drawer for extended periods. Choose fruit you can carry without bruising and wash or peel it appropriately before eating."] },
          { title: "Khakhra", body: ["Khakhra is flat, portable and easy to pair with tea. It can still shed crumbs, and flavoured versions vary in oil, sodium and ingredients. Breaking a larger piece into a container before the workday makes it easier to eat neatly."] },
          { title: "A simple trail mix", body: ["A mix of nuts, seeds and a small amount of dried fruit is convenient when you want variety in one container. Ready-made mixes can include sweet pieces, fried additions or generous seasoning, so inspect the ingredient list and pre-portion the mix before storing it at your desk."] }
        ]
      },
      {
        heading: "Planning for the 4-7 PM Office Hunger Window",
        body: [
          "The lunch-to-dinner gap can be long, especially when meetings run late or the journey home starts after work. Keeping one shelf-stable option available means the decision is made while you are calm, not only after you become very hungry. It is a planning tool, not a promise that one food will control appetite.",
          "Before eating, move one portion out of a large pack and put the remainder away. Then take a short break if possible instead of grazing through calls. If a small crunchy snack is consistently not enough on long days, plan a more substantial option rather than repeatedly opening extra packets."
        ]
      },
      {
        heading: "A Quick Packaged-Snack Label Check",
        body: [
          "Start with serving size and compare it with the amount you will actually eat. A packet may contain more than one serving, so a per-serving number is only useful when it matches your portion. Check calories in that context rather than using the smallest printed number as the whole story.",
          "Next look at added sugar, sodium, total fat, fibre and protein, then read the ingredient list and preparation description. These details work together: one low number does not automatically make a food healthy, and one higher number does not explain the whole product."
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
        heading: "How to Build a Simple Office Snack Rotation",
        body: [
          "Use three roles instead of buying many similar packets: one crunchy shelf-stable option, one fresh option when practical and one more substantial choice for unusually long days. For example, keep roasted chana in the drawer, bring fruit on selected days and plan bread with peanut butter or another suitable option when dinner will be late."
        ]
      },
      {
        heading: "Healthy Tea-Time Snacks for Office in India",
        body: [
          "Tea-time planning does not require abandoning chai or declaring familiar snacks forbidden. It means choosing deliberately instead of reaching for the same biscuit plate every day. Roasted makhana, chana, khakhra, fruit, simple popcorn or a measured nut portion can each fill a different role.",
          "For local workday and commute context, see the Khao Better guide to healthy office snacks in Delhi NCR. Students planning long study days can use the related Khao Better guide to healthy snacks for students."
        ]
      }
    ],
    faqs: [
      ["What are healthy office snacks in India?", "Useful office options include roasted makhana, roasted chana, nuts, fruit, khakhra, peanuts, simple popcorn and a portioned trail mix."],
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
      { href: "/delhi", label: "healthy office snacks in Delhi NCR" },
      { href: "/student-snacks", label: "Healthy snacks for students" }
    ]
  },
  "student-snacks": {
    slug: "student-snacks",
    eyebrow: "Hostel snacking",
    h1: "Healthy Snacks for Hostel Students Under ₹100",
    title: "Healthy Snacks for Hostel Students Under ₹100 | Khao Better",
    description:
      "Practical hostel snacks for a ₹100 budget, including no-cooking options, storage guidance and study-session planning for Indian students.",
    intro: [
      "Hostel snacks have to fit real student life: a limited budget, little kitchen access, shared rooms, classes, travel to the library and sometimes no fridge. The best healthy snacks for hostel students under ₹100 are practical before they are fancy.",
      "₹100 is a planning limit, not a promise that every item or pack costs the same everywhere. Local prices vary by city, shop, brand, season and pack size, so compare what one purchase provides and choose options that fit your own hostel setup."
    ],
    sections: [
      { heading: "What Makes a Snack Hostel-Friendly?", body: ["A useful hostel snack should fit the available budget and storage, travel easily between the room, class and library, and need little preparation. A clear serving size helps when space is tight and large open packets are easy to keep eating from.", "Shelf-stable foods are useful where refrigeration is unavailable, but they still need sealed storage and attention to the pack's instructions and best-before date. Fresh fruit is a buy-for-now option, while curd and other chilled foods should only be kept where reliable refrigeration is available."] },
      {
        heading: "10 Affordable Hostel Snack Ideas for a ₹100 Budget",
        cards: [
          { title: "Roasted makhana", body: ["Roasted makhana is portable, crunchy and easy to pre-portion for a study session. Khao Better Classic Roasted is ₹59 for a 25 g pack. It is currently out of stock during pre-launch, so the site offers waitlist updates rather than ordering. The Makhana nutrition facts guide explains the Classic nutrition data and portion calculations."] },
          { title: "Roasted chana", body: ["Roasted chana is shelf-stable and sturdy enough for a class or library bag. Compare pack sizes and seasoning rather than assuming the largest packet is the best value, then move one serving into a smaller container."] },
          { title: "Peanuts", body: ["Peanuts need no cooking and can be bought in different pack sizes. They are energy-dense, so portioning matters. Check seasoning and allergens, especially in a shared room where someone may need to avoid peanuts."] },
          { title: "Bananas or seasonal fruit", body: ["Fruit needs no cooking and gives the snack kit a fresh option. Buy an amount you can eat before it bruises or ripens, and choose what offers good value locally."] },
          { title: "Oats when preparation is available", body: ["Oats can be practical when the hostel permits a kettle or provides a microwave and clean bowl. They are not a no-cooking option, so check the facilities first and follow the preparation instructions rather than improvising with unsuitable appliances."] },
          { title: "Bread with peanut butter", body: ["Bread with a measured amount of peanut butter can be more substantial than a handful of crunchy snacks. Check storage directions, use clean utensils and consider how quickly the bread will be used in the local weather."] },
          { title: "Khakhra", body: ["Khakhra is flat, portable and ready to eat. It can create crumbs in bed or near notes, and recipes vary in oil, sodium and ingredients, so keep it sealed and compare labels."] },
          { title: "Simple homemade trail mix", body: ["Combining small amounts of nuts, seeds or dried fruit lets you control the mix instead of paying for ingredients you do not want. Keep the portion modest, avoid adding several sweet components and store it in a clean sealed container."] },
          { title: "Plain popcorn", body: ["A simply prepared or packaged popcorn option can provide plenty of crunch for a study session. Butter, caramel and heavy seasoning change the product, so check preparation and serving size rather than treating all popcorn as equivalent."] },
          { title: "Curd where refrigeration is reliable", body: ["Curd can be a fresh option only when reliable refrigeration is available. Buy an appropriate portion, follow the label's storage instructions and do not keep it unrefrigerated in a hostel room."] }
        ]
      },
      { heading: "Compare Cost per Serving, Not Just Pack Price", body: ["A low sticker price can be misleading if the packet provides very little food, while a larger purchase may be poor value if it goes stale before you finish it. Check the stated net quantity and serving size, then estimate how many realistic snack portions you will use.", "Value also includes waste. Fruit that overripens or a large open pouch that turns stale has not saved money, so start with a manageable quantity."] },
      { heading: "No-Fridge and No-Cooking Options", body: ["Roasted chana, peanuts, roasted makhana, khakhra, packaged simple popcorn and sealed trail mix are shelf-stable choices when their labels permit room-temperature storage. Whole fruit can work as a fresh short-term option, but it should be checked regularly and eaten before it spoils.", "Oats require suitable preparation, and curd requires refrigeration. Bread and opened spreads need attention to their own storage directions and the local room conditions. Keeping these categories separate prevents a convenient snack list from becoming unsafe storage advice."], table: [["Hostel setup", "Practical examples", "What to check"], ["No fridge, no cooking", "Roasted chana, makhana, peanuts, khakhra", "Seal after opening; follow the label"], ["Fresh, same-day planning", "Bananas or seasonal fruit", "Buy manageable quantities; check condition"], ["Kettle or microwave available", "Oats", "Hostel rules and preparation instructions"], ["Reliable fridge available", "Curd", "Keep chilled as directed on the pack"]] },
      { heading: "Practical Exam and Late-Night Study Snacks", body: ["A study-session snack should be easy to portion and eat without covering notes or a keyboard in oil and crumbs. Roasted chana, fruit, roasted makhana, plain popcorn or a measured nut portion are practical choices. These are practical study-session options, but no snack can guarantee that you won't feel sleepy.", "Put one serving in a bowl or container before opening your notes. Keeping a family pack beside the laptop makes repeated eating easy to miss. Keep water nearby as well, and treat caffeinated drinks separately because their timing may affect sleep."] },
      { heading: "A Simple Hostel Snack Kit", body: ["Start with three to five staples rather than a crowded shelf: one crunchy roasted option, one nut or seed option if allergies permit, one fresh fruit bought in small quantities, one more substantial choice such as oats or bread with peanut butter, and one comfort snack you genuinely enjoy.", "For example, roasted chana can cover library days, bananas can be bought for the next morning, oats can stay reserved for days when preparation is available and khakhra can provide an occasional tea-time crunch. The exact kit should reflect storage, budget and hostel rules."] }
    ],
    faqs: [
      ["What are practical snacks for hostel students with a ₹100 budget?", "Compare local prices and portions for roasted chana, peanuts, seasonal fruit, khakhra, simple popcorn, homemade trail mix and roasted makhana. Prices vary by city, shop, brand and pack size."],
      ["What snacks can I keep in a hostel room without a fridge?", "Roasted chana, peanuts, makhana, khakhra, plain popcorn and sealed trail mix are practical no-fridge snacks."],
      ["Is makhana good for students during exams?", "Roasted makhana can be a useful exam snack when portioned clearly. It is crunchy, easy to portion and simple to keep near a study desk."],
      ["Can I order Khao Better makhana now?", "Khao Better is pre-launch. Classic Roasted is currently out of stock, and the site is for waitlist interest only."],
      ["How should I plan a late-night study snack?", "Pre-portion a practical snack, keep water nearby and avoid leaving a large open packet beside your study space. No snack is guaranteed to prevent sleepiness."]
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
    h1: "Low-Calorie Evening Snacks for Office Workers in Delhi",
    title: "Low-Calorie Snacks for Delhi Office Workers | Khao Better",
    description:
      "Practical lower-calorie evening snack ideas for Delhi NCR workdays, with portion, preparation, office-drawer and commute guidance.",
    intro: [
      "A low-calorie evening snack for office workers in Delhi is not one universal food. The calories depend on the portion, recipe and preparation, so a useful choice starts with the actual serving and label rather than a healthy-sounding category name.",
      "Delhi NCR workdays can place a long gap between lunch and dinner, especially when an evening commute follows the final meeting. A planned desk or bag snack can be easier to manage than waiting until the journey home to decide. This guide covers practical options for Delhi, Gurugram and Noida workdays."
    ],
    sections: [
      { heading: "Why the Evening Snack Matters in a Delhi Workday", body: ["The evening snack often sits between two different parts of the day: the last working hours and the trip home. Someone eating at a desk may prioritise low mess, while someone heading for the Metro, a cab or a car needs a pack that closes securely and can be eaten without preparation.", "Chai, samosa, biscuits, namkeen and chips remain familiar because they are convenient and enjoyable. The aim is not to declare them forbidden. It is to keep additional choices available for days when you want a smaller portion, a different preparation or something easier to carry."] },
      { heading: "What Does Low-Calorie Mean for an Evening Snack?", body: ["Whether an evening snack is low in calories depends on the portion, recipe and preparation. A small serving of an energy-dense food and a large serving of a lighter food are different choices, and oil, frying, butter, sugar coatings and seasoning can change the final product.", "Use the serving size and calories on packaged-food labels, then compare that serving with what you intend to eat. For unpackaged food, keep the portion visible and avoid treating words such as roasted or baked as a complete nutrition assessment.", "Calories are only one part of a useful choice. Ingredients, added sugar, sodium, fat, fibre and protein may also matter depending on the product and your needs. No single number creates an automatic health ranking."] },
      {
        heading: "Practical Evening Snack Options",
        cards: [
          { title: "Roasted makhana", body: ["Roasted makhana, or fox nuts, provides an airy crunch and is easy to divide into a desk portion. Oil and seasoning vary between products, so use the pack label when comparing it with chips, namkeen or popcorn."] },
          { title: "Roasted chana", body: ["Roasted chana is compact and shelf-stable when stored as directed. It has a denser bite than makhana and travels well, but salted and masala versions can differ in sodium and ingredients."] },
          { title: "Nuts or peanuts", body: ["Nuts and peanuts take little space in a work bag, but they are energy-dense and easy to over-pour. Decide a portion before leaving the office and account for allergy needs in shared spaces."] },
          { title: "Whole fruit", body: ["Bananas, apples, oranges or other practical seasonal fruit can provide a fresh contrast to packaged snacks. Carry fruit that can handle the journey, check its condition and avoid leaving it in a drawer for extended periods."] },
          { title: "Khakhra", body: ["Khakhra pairs naturally with tea and fits flat in a bag. Recipes vary, so compare serving size, oil, sodium and ingredients. A container can prevent breakage and keep crumbs out of the bag."] },
          { title: "Simple popcorn", body: ["Plain or simply seasoned popcorn can be a portable crunchy option. Butter, caramel and heavy coatings change the comparison, and a loose open bag may be awkward during a commute, so packaging matters."] }
        ]
      },
      { heading: "Office Drawer vs Commute Snacks", body: ["A desk drawer favours sealed foods that tolerate room-temperature storage as directed. A commute snack needs the same storage care plus packaging that will not leak, scatter crumbs or be difficult to close after eating.", "Fresh fruit may suit the office when bought for the day, while roasted chana, makhana or nuts can be easier to carry home. Hot foods can be enjoyable at tea time but are usually less convenient once the commute starts. Choose for the moment instead of expecting one snack to do every job."], table: [["Situation", "Useful options", "Practical check"], ["Desk drawer", "Roasted chana, makhana, nuts", "Keep sealed; check serving and best-before date"], ["Work bag or commute", "Whole fruit, sealed roasted snacks, khakhra", "Avoid crushing, leaks and open packets"], ["Office pantry", "Freshly prepared popcorn or suitable fresh food", "Use available preparation and safe storage"], ["Shared team snack", "Portioned bowls or individual servings", "Consider allergens, mess and shared handling"]] },
      { heading: "Portion and Preparation Change the Comparison", body: ["Roasted, fried, baked and coated snacks can have very different recipes even when the base ingredient sounds similar. Compare products using realistic portions, and remember that ghee, oil, cheese powders, caramel or other coatings can change calories, fat, sugar and sodium.", "A smaller pack can make the stopping point obvious, while a large shared packet may need bowls or containers. That can make portioning easier, but it does not mean the food itself guarantees weight control.", "For a broader workday framework, the Healthy office snacks in India guide covers drawer storage, label reading and snack rotation beyond the Delhi NCR context."] },
      { heading: "Roasted Makhana and Khao Better in Delhi NCR", body: ["People looking for roasted makhana in Delhi can compare products by portion, preparation and label. Khao Better Classic Roasted is a 25 g pack priced at ₹59 and is approximately 113 kcal per pack based on its nutrition panel. It is roasted rather than deep-fried.", "Khao Better is still pre-launch and Classic Roasted is currently out of stock, so the site currently offers waitlist updates rather than ordering or delivery."] },
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
