import type { Metadata } from "next";
import { ClassicProductViewTracker } from "@/components/ClassicProductViewTracker";
import { ClassicRoastedContent, StorefrontShell } from "@/components/Storefront";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Classic Roasted Makhana | Khao Better",
  description:
    "Discover Khao Better Classic Roasted Makhana. The first batch is currently unavailable - join the waitlist for launch updates.",
  alternates: {
    canonical: absoluteUrl("/makhana-classic-roasted")
  },
  openGraph: {
    title: "Classic Roasted Makhana | Khao Better",
    description:
      "Discover Khao Better Classic Roasted Makhana. The first batch is currently unavailable - join the waitlist for launch updates.",
    url: absoluteUrl("/makhana-classic-roasted")
  }
};

export default function Page() {
  return (
    <StorefrontShell>
      <ClassicProductViewTracker />
      <ClassicRoastedContent />
    </StorefrontShell>
  );
}
