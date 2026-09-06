import type { Metadata } from "next";
import { HomePageContent, StorefrontShell } from "@/components/Storefront";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Khao Better Makhana | Roasted Fox Nut Snacks",
  description:
    "Khao Better is a pre-launch roasted makhana brand for everyday snacking. Explore our flavours, makhana guide and upcoming launch.",
  alternates: {
    canonical: absoluteUrl("/")
  },
  openGraph: {
    title: "Khao Better Makhana | Roasted Fox Nut Snacks",
    description:
      "Khao Better is a pre-launch roasted makhana brand for everyday snacking. Explore our flavours, makhana guide and upcoming launch.",
    url: absoluteUrl("/")
  }
};

export default function Page() {
  return (
    <StorefrontShell>
      <HomePageContent />
    </StorefrontShell>
  );
}
