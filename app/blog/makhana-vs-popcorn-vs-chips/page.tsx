import type { Metadata } from "next";
import { BlogArticleContent } from "@/components/BlogContent";
import { blogIndex } from "@/data/blog";
import { StorefrontShell } from "@/components/Storefront";

const article = blogIndex["makhana-vs-popcorn-vs-chips"];

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  alternates: {
    canonical: "/blog/makhana-vs-popcorn-vs-chips"
  },
  openGraph: {
    title: article.title,
    description: article.description,
    url: "https://khaobetter.shop/blog/makhana-vs-popcorn-vs-chips"
  }
};

export default function Page() {
  return (
    <StorefrontShell>
      <BlogArticleContent article={article} />
    </StorefrontShell>
  );
}
