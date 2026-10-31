import type { Metadata } from "next";
import { OurStoryContent, StorefrontShell } from "@/components/Storefront";
import { absoluteUrl, defaultOpenGraphImages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story | Khao Better",
  description:
    "Meet Khao Better, a pre-launch roasted makhana brand built around making everyday snacking simpler, more enjoyable and more thoughtful.",
  alternates: {
    canonical: absoluteUrl("/our-story")
  },
  openGraph: {
    images: defaultOpenGraphImages,
    title: "Our Story | Khao Better",
    description:
      "Meet Khao Better, a pre-launch roasted makhana brand built around making everyday snacking simpler, more enjoyable and more thoughtful.",
    url: absoluteUrl("/our-story")
  }
};

export default function Page() {
  return (
    <StorefrontShell>
      <OurStoryContent />
    </StorefrontShell>
  );
}
