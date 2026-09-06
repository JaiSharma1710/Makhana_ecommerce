import type { Metadata } from "next";
import { BlogArticleContent } from "@/components/BlogContent";
import { blogIndex } from "@/data/blog";
import { StorefrontShell } from "@/components/Storefront";
import { absoluteUrl } from "@/lib/site";

const article = blogIndex["makhana-vs-popcorn-vs-chips"];

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  alternates: {
    canonical: absoluteUrl("/blog/makhana-vs-popcorn-vs-chips")
  },
  openGraph: {
    title: article.title,
    description: article.description,
    url: absoluteUrl("/blog/makhana-vs-popcorn-vs-chips")
  }
};

export default function Page() {
  return (
    <StorefrontShell>
      <BlogArticleContent article={article} />
    </StorefrontShell>
  );
}
