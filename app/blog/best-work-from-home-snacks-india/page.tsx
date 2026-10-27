import type { Metadata } from "next";
import { BlogArticleContent } from "@/components/BlogContent";
import { blogIndex } from "@/data/blog";
import { StorefrontShell } from "@/components/Storefront";
import { absoluteUrl } from "@/lib/site";

const article = blogIndex["best-work-from-home-snacks-india"];

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  alternates: {
    canonical: absoluteUrl("/blog/best-work-from-home-snacks-india")
  },
  openGraph: {
    title: article.title,
    description: article.description,
    url: absoluteUrl("/blog/best-work-from-home-snacks-india")
  }
};

export default function Page() {
  return (
    <StorefrontShell>
      <BlogArticleContent article={article} />
    </StorefrontShell>
  );
}
