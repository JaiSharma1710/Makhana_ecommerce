import type { Metadata } from "next";
import { BlogHubContent } from "@/components/BlogContent";
import { StorefrontShell } from "@/components/Storefront";

export const metadata: Metadata = {
  title: "Khao Better Journal | Makhana, Nutrition & Better Snacking",
  description:
    "Explore Khao Better guides on makhana, roasted fox nuts, nutrition, everyday snacking and practical snack comparisons.",
  alternates: {
    canonical: "/blog"
  },
  openGraph: {
    title: "Khao Better Journal | Makhana, Nutrition & Better Snacking",
    description:
      "Explore Khao Better guides on makhana, roasted fox nuts, nutrition, everyday snacking and practical snack comparisons.",
    url: "https://khaobetter.shop/blog"
  }
};

export default function Page() {
  return (
    <StorefrontShell>
      <BlogHubContent />
    </StorefrontShell>
  );
}
