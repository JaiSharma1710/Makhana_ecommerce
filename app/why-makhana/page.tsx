import type { Metadata } from "next";
import { StorefrontShell, WhyMakhanaContent } from "@/components/Storefront";

export const metadata: Metadata = {
  title: "Why Makhana? A Guide to Roasted Fox Nuts | Khao Better",
  description:
    "Learn what makhana is, how roasted fox nuts are prepared, and why they are a popular everyday snack in India.",
  alternates: {
    canonical: "/why-makhana"
  },
  openGraph: {
    title: "Why Makhana? A Guide to Roasted Fox Nuts | Khao Better",
    description:
      "Learn what makhana is, how roasted fox nuts are prepared, and why they are a popular everyday snack in India.",
    url: "https://khaobetter.shop/why-makhana"
  }
};

export default function Page() {
  return (
    <StorefrontShell>
      <WhyMakhanaContent />
    </StorefrontShell>
  );
}
