import type { Metadata } from "next";
import { BlogArticleContent } from "@/components/BlogContent";
import { blogIndex } from "@/data/blog";
import { StorefrontShell } from "@/components/Storefront";
import { absoluteUrl } from "@/lib/site";

const article = blogIndex["broken-makhana-packet-quality"];

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  alternates: { canonical: absoluteUrl("/blog/broken-makhana-packet-quality") },
  openGraph: {
    title: article.title,
    description: article.description,
    url: absoluteUrl("/blog/broken-makhana-packet-quality")
  }
};

export default function Page() {
  return <StorefrontShell><BlogArticleContent article={article} /></StorefrontShell>;
}
