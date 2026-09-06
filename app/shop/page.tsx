import type { Metadata } from "next";
import { ShopPageContent, StorefrontShell } from "@/components/Storefront";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Roasted Makhana Flavours | Khao Better",
  description:
    "Explore Khao Better roasted makhana flavours. Classic Roasted is currently out of stock, with more flavours coming soon.",
  alternates: {
    canonical: absoluteUrl("/shop")
  },
  openGraph: {
    title: "Roasted Makhana Flavours | Khao Better",
    description:
      "Explore Khao Better roasted makhana flavours. Classic Roasted is currently out of stock, with more flavours coming soon.",
    url: absoluteUrl("/shop")
  }
};

export default function Page() {
  return (
    <StorefrontShell>
      <ShopPageContent />
    </StorefrontShell>
  );
}
