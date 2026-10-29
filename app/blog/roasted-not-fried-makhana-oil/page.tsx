import type { Metadata } from "next";
import { BlogArticleContent } from "@/components/BlogContent";
import { blogIndex } from "@/data/blog";
import { StorefrontShell } from "@/components/Storefront";
import { absoluteUrl } from "@/lib/site";

const article = blogIndex["roasted-not-fried-makhana-oil"];

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  alternates: { canonical: absoluteUrl("/blog/roasted-not-fried-makhana-oil") },
  openGraph: {
    title: article.title,
    description: article.description,
    url: absoluteUrl("/blog/roasted-not-fried-makhana-oil")
  }
};

export default function Page() {
  return <StorefrontShell><BlogArticleContent article={article} /></StorefrontShell>;
}
