import type { Metadata } from "next";
import { ShopPageContent, StorefrontShell } from "@/components/Storefront";

export const metadata: Metadata = {
  title: "Roasted Makhana Flavours | Khao Better",
  description:
    "Explore Khao Better roasted makhana flavours. Classic Roasted is currently out of stock, with more flavours coming soon.",
  alternates: {
    canonical: "/shop"
  },
  openGraph: {
    title: "Roasted Makhana Flavours | Khao Better",
    description:
      "Explore Khao Better roasted makhana flavours. Classic Roasted is currently out of stock, with more flavours coming soon.",
    url: "https://khaobetter.shop/shop"
  }
};

export default function Page() {
  return (
    <StorefrontShell>
      <ShopPageContent />
    </StorefrontShell>
  );
}
