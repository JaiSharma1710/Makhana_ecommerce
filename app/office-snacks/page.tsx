import type { Metadata } from "next";
import { LandingPageContent } from "@/components/LandingPageContent";
import { landingPages } from "@/data/landing";
import { absoluteUrl } from "@/lib/site";
import { StorefrontShell } from "@/components/Storefront";

const page = landingPages["office-snacks"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: absoluteUrl("/office-snacks")
  },
  openGraph: {
    title: page.title,
    description: page.description,
    url: absoluteUrl("/office-snacks")
  }
};

export default function Page() {
  return (
    <StorefrontShell>
      <LandingPageContent page={page} />
    </StorefrontShell>
  );
}
