import type { Metadata } from "next";
import { ClassicRoastedContent, StorefrontShell } from "@/components/Storefront";

export const metadata: Metadata = {
  title: "Classic Roasted Makhana | Khao Better",
  description:
    "Discover Khao Better Classic Roasted Makhana. The first batch is currently unavailable - join the waitlist for launch updates.",
  alternates: {
    canonical: "/makhana-classic-roasted"
  },
  openGraph: {
    title: "Classic Roasted Makhana | Khao Better",
    description:
      "Discover Khao Better Classic Roasted Makhana. The first batch is currently unavailable - join the waitlist for launch updates.",
    url: "https://khaobetter.shop/makhana-classic-roasted"
  }
};

export default function Page() {
  return (
    <StorefrontShell>
      <ClassicRoastedContent />
    </StorefrontShell>
  );
}
