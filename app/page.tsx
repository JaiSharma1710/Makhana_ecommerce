import type { Metadata } from "next";
import { HomePageContent, StorefrontShell } from "@/components/Storefront";

export const metadata: Metadata = {
  title: "Khao Better Makhana | Roasted Fox Nut Snacks",
  description:
    "Khao Better is a pre-launch roasted makhana brand for everyday snacking. Explore our flavours, makhana guide and upcoming launch.",
  alternates: {
    canonical: "./"
  },
  openGraph: {
    title: "Khao Better Makhana | Roasted Fox Nut Snacks",
    description:
      "Khao Better is a pre-launch roasted makhana brand for everyday snacking. Explore our flavours, makhana guide and upcoming launch.",
    url: "https://khaobetter.shop/"
  }
};

export default function Page() {
  return (
    <StorefrontShell>
      <HomePageContent />
    </StorefrontShell>
  );
}
