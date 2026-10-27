import type { Metadata } from "next";
import { BlogArticleContent } from "@/components/BlogContent";
import { blogIndex } from "@/data/blog";
import { StorefrontShell } from "@/components/Storefront";
import { absoluteUrl } from "@/lib/site";

const article = blogIndex["best-study-snacks-long-study-sessions-india"];

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  alternates: {
    canonical: absoluteUrl("/blog/best-study-snacks-long-study-sessions-india")
  },
  openGraph: {
    title: article.title,
    description: article.description,
    url: absoluteUrl("/blog/best-study-snacks-long-study-sessions-india")
  }
};

export default function Page() {
  return (
    <StorefrontShell>
      <BlogArticleContent article={article} />
    </StorefrontShell>
  );
}
