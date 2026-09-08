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
  "makhana-nutrition-facts"
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
      "A clear nutrition reference for Khao Better Classic Roasted, with 25 g, 30 g, 50 g and 100 g calculations.",
    readTime: "6 min read",
    primaryKeyword: "roasted makhana calories per 30g serving"
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
  return blogPosts
    .filter((post) => post.slug !== slug)
    .sort((left, right) =>
      Number(right.category === current.category) - Number(left.category === current.category)
    )
    .slice(0, limit);
}
