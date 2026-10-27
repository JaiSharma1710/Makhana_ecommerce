import type { Metadata } from "next";
import { BlogArticleContent } from "@/components/BlogContent";
import { blogIndex } from "@/data/blog";
import { StorefrontShell } from "@/components/Storefront";
import { absoluteUrl } from "@/lib/site";

const article = blogIndex["how-to-keep-roasted-makhana-crispy"];

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  alternates: {
    canonical: absoluteUrl("/blog/how-to-keep-roasted-makhana-crispy")
  },
  openGraph: {
    title: article.title,
    description: article.description,
    url: absoluteUrl("/blog/how-to-keep-roasted-makhana-crispy")
  }
};

export default function Page() {
  return (
    <StorefrontShell>
      <BlogArticleContent article={article} />
    </StorefrontShell>
  );
}
