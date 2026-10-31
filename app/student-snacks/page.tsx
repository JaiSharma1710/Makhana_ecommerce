import type { Metadata } from "next";
import { LandingPageContent } from "@/components/LandingPageContent";
import { landingPages } from "@/data/landing";
import { absoluteUrl, defaultOpenGraphImages } from "@/lib/site";
import { StorefrontShell } from "@/components/Storefront";

const page = landingPages["student-snacks"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: absoluteUrl("/student-snacks")
  },
  openGraph: {
    images: defaultOpenGraphImages,
    title: page.title,
    description: page.description,
    url: absoluteUrl("/student-snacks")
  }
};

export default function Page() {
  return (
    <StorefrontShell>
      <LandingPageContent page={page} />
    </StorefrontShell>
  );
}
