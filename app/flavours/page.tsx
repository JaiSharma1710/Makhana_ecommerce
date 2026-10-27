import type { Metadata } from "next";
import { FlavoursPageContent } from "@/components/FlavoursPageContent";
import { StorefrontShell } from "@/components/Storefront";
import { absoluteUrl } from "@/lib/site";

const title = "Makhana Flavours: Explore 6 Flavours | Khao Better";
const description = "Explore six Khao Better makhana flavours, from Classic Roasted to Peri Peri, Pudina Punch and more. See what's launching first and what's coming soon.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/flavours") },
  openGraph: { title, description, url: absoluteUrl("/flavours") }
};

export default function Page() {
  return <StorefrontShell><FlavoursPageContent /></StorefrontShell>;
}
