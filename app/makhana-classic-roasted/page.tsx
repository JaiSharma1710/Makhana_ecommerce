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
  const productUrl = absoluteUrl("/makhana-classic-roasted");
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Classic Roasted Makhana",
    brand: {
      "@type": "Brand",
      name: "Khao Better"
    },
    image: absoluteUrl("/assets/p-classic.png"),
    url: productUrl,
    size: "25 g",
    offers: {
      "@type": "Offer",
      price: "59",
      priceCurrency: "INR",
      availability: "https://schema.org/OutOfStock",
      url: productUrl
    }
  };

  return (
    <StorefrontShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c") }}
      />
      <ClassicProductViewTracker />
      <ClassicRoastedContent />
    </StorefrontShell>
  );
}
