export const blogCategories = [
  { slug: "nutrition", label: "Nutrition" },
  { slug: "weight-portions", label: "Weight & Portions" },
  { slug: "comparisons", label: "Comparisons" },
  { slug: "everyday-snacking", label: "Everyday Snacking" }
] as const;

export type BlogCategory = (typeof blogCategories)[number]["label"];
export type BlogCategorySlug = (typeof blogCategories)[number]["slug"];

export const blogSlugs = [
  "makhana-weight-loss",
  "makhana-vs-popcorn-vs-chips",
  "makhana-nutrition-facts",
  "makhana-vs-lotus-seeds",
  "how-to-keep-roasted-makhana-crispy",
  "best-study-snacks-long-study-sessions-india",
  "best-work-from-home-snacks-india",
  "why-is-makhana-expensive-india"
] as const;

export type BlogSlug = (typeof blogSlugs)[number];

export type BlogPost = {
  slug: BlogSlug;
  title: string;
  h1: string;
  description: string;
  excerpt: string;
  category: BlogCategory;
  readTime: string;
  primaryKeyword: string;
  featured?: boolean;
};

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "makhana-weight-loss",
    category: "Weight & Portions",
    title: "How Much Makhana Can You Eat Daily for Weight Loss?",
    h1: "How Much Makhana Can You Eat in a Day for Weight Loss?",
    description:
      "A practical guide to makhana portions, calories and preparation. See how a 25-35 g roasted makhana serving can fit into an everyday eating plan.",
    excerpt:
      "A careful guide to roasted makhana portions, calories, late-night snacking and preparation choices for people managing their everyday eating plan.",
    readTime: "7 min read",
    primaryKeyword: "how much makhana can i eat in a day for weight loss",
    featured: true
  },
  {
    slug: "makhana-vs-popcorn-vs-chips",
    category: "Comparisons",
    title: "Makhana vs Popcorn vs Chips: Which Is Healthier?",
    h1: "Makhana vs Popcorn vs Chips: Which Is Actually Healthier?",
    description:
      "Compare roasted makhana, popcorn and potato chips by preparation, portion size, convenience and everyday snacking use.",
    excerpt:
      "A practical comparison of roasted makhana, popcorn and chips based on preparation, portion control, office use and label-reading.",
    readTime: "6 min read",
    primaryKeyword: "makhana vs popcorn which is healthier for weight loss"
  },
  {
    slug: "makhana-nutrition-facts",
    category: "Nutrition",
    title: "Roasted Makhana Nutrition Facts & Calories | Khao Better",
    h1: "Roasted Makhana Nutrition Facts: Calories, Protein, Fibre & More",
    description:
      "See roasted makhana calories per 30 g serving plus Khao Better Classic nutrition per 25 g and 100 g, including protein, fibre and fat.",
    excerpt:
      "A clear nutrition reference for Khao Better Classic Roasted, with 25 g, 30 g, 35 g and 100 g calculations.",
    readTime: "6 min read",
    primaryKeyword: "roasted makhana calories per 30g serving"
  },
  {
    slug: "makhana-vs-lotus-seeds",
    category: "Comparisons",
    title: "Makhana vs Lotus Seeds: Are They the Same? | Khao Better",
    h1: "Makhana vs Lotus Seeds: Are They Actually the Same?",
    description:
      "Are makhana and lotus seeds the same? Learn the botanical difference between Euryale ferox and true lotus seeds, plus how they differ in use and texture.",
    excerpt:
      "A clear botanical comparison of makhana from Euryale ferox and true lotus seeds from Nelumbo nucifera, including names, uses and texture.",
    readTime: "7 min read",
    primaryKeyword: "makhana vs lotus seeds"
  },
  {
    slug: "how-to-keep-roasted-makhana-crispy",
    category: "Everyday Snacking",
    title: "How to Keep Roasted Makhana Crispy After Opening | Khao Better",
    h1: "How to Keep Roasted Makhana Crispy After Opening",
    description:
      "Learn how to keep roasted makhana crispy after opening, the best way to store it, why makhana turns soft, and how to make soggy makhana crunchy again.",
    excerpt:
      "Practical steps for storing opened roasted makhana, keeping moisture out and restoring the crunch when makhana turns soft.",
    readTime: "8 min read",
    primaryKeyword: "how to keep roasted makhana crispy after opening"
  },
  {
    slug: "best-study-snacks-long-study-sessions-india",
    category: "Everyday Snacking",
    title: "Study Snacks for Long Study Sessions in India | Khao Better",
    h1: "Best Study Snacks for Long Study Sessions in India",
    description:
      "Best study snacks for long study sessions in India: practical desk-friendly, hostel-friendly and late-night options, plus portion and hydration tips.",
    excerpt:
      "Practical desk, library, hostel and late-night snack ideas for Indian students, with portion, storage and hydration guidance.",
    readTime: "10 min read",
    primaryKeyword: "best study snacks for long study sessions india"
  },
  {
    slug: "best-work-from-home-snacks-india",
    category: "Everyday Snacking",
    title: "Best Work From Home Snacks in India | Khao Better",
    h1: "Best Work-From-Home Snacks in India for Desk Jobs",
    description:
      "Best work-from-home snacks in India for desk jobs: practical no-prep, tea-break and 4–6 PM options, plus tips to avoid mindless snacking.",
    excerpt:
      "Practical no-prep, tea-break and late-afternoon snack ideas for Indian remote workers, with tips for portioning at a home desk.",
    readTime: "10 min read",
    primaryKeyword: "best work from home snacks india"
  },
  {
    slug: "why-is-makhana-expensive-india",
    category: "Everyday Snacking",
    title: "Why Is Makhana So Expensive in India? | Khao Better",
    h1: "Why Is Makhana So Expensive in India?",
    description:
      "Why is makhana so expensive in India? Learn how harvesting, labour-intensive popping, grading, rising demand and packaged snack costs affect its price.",
    excerpt:
      "A detailed explanation of how aquatic cultivation, harvesting, popping, grading, demand and packaged-snack costs affect makhana prices.",
    readTime: "14 min read",
    primaryKeyword: "why is makhana expensive in india"
  }
];

export const blogPostIndex = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post])
) as Record<BlogSlug, BlogPost>;

export const populatedBlogCategories = blogCategories.filter((category) =>
  blogPosts.some((post) => post.category === category.label)
);

export function articleUrl(slug: BlogSlug) {
  return `/blog/${slug}` as const;
}

export function categoryUrl(slug: BlogCategorySlug) {
  return `/blog#${slug}` as const;
}

export function relatedBlogPosts(slug: BlogSlug, limit = 2) {
  const current = blogPostIndex[slug];
  const preferred: BlogSlug[] = slug === "how-to-keep-roasted-makhana-crispy"
    ? ["makhana-nutrition-facts", "makhana-vs-popcorn-vs-chips", "makhana-vs-lotus-seeds"]
    : slug === "best-study-snacks-long-study-sessions-india"
      ? ["how-to-keep-roasted-makhana-crispy", "makhana-nutrition-facts", "makhana-vs-popcorn-vs-chips"]
      : slug === "best-work-from-home-snacks-india"
        ? ["how-to-keep-roasted-makhana-crispy", "makhana-nutrition-facts", "makhana-vs-popcorn-vs-chips"]
        : slug === "why-is-makhana-expensive-india"
          ? ["makhana-vs-lotus-seeds", "makhana-nutrition-facts", "makhana-vs-popcorn-vs-chips"]
          : [];
  return blogPosts
    .filter((post) => post.slug !== slug)
    .sort((left, right) => {
      if (preferred.length) {
        const leftRank = preferred.indexOf(left.slug);
        const rightRank = preferred.indexOf(right.slug);
        return (leftRank < 0 ? Number.MAX_SAFE_INTEGER : leftRank) -
          (rightRank < 0 ? Number.MAX_SAFE_INTEGER : rightRank);
      }
      return Number(right.category === current.category) - Number(left.category === current.category);
    })
    .slice(0, limit);
}
