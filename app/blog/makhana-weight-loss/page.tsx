import type { Metadata } from "next";
import { BlogArticleContent } from "@/components/BlogContent";
import { blogIndex } from "@/data/blog";
import { StorefrontShell } from "@/components/Storefront";

const article = blogIndex["makhana-weight-loss"];

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  alternates: {
    canonical: "/blog/makhana-weight-loss"
  },
  openGraph: {
    title: article.title,
    description: article.description,
    url: "https://khaobetter.shop/blog/makhana-weight-loss"
  }
};

export default function Page() {
  return (
    <StorefrontShell>
      <BlogArticleContent article={article} />
    </StorefrontShell>
  );
}
