import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL("https://khaobetter.in"),
  title: "Roasted Makhana Online - Khao Better | Fox Nuts, Never Fried | Rs 49",
  description:
    "Buy roasted makhana online from Khao Better. Dry-roasted Bihar fox nuts in six flavours, 113 kcal and 2.6 g fibre per 25 g pack, no added sugar, 0 g trans fat. Classic Roasted Rs 49. Free shipping over Rs 299.",
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large"
    }
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Khao Better",
    title: "Roasted Makhana Online - Khao Better | Fox Nuts, Never Fried",
    description:
      "Dry-roasted makhana from Bihar in six flavours. 113 kcal, 2.6 g fibre and no added sugar per 25 g pack. Classic Roasted Rs 49, free shipping over Rs 299.",
    images: [{ url: "/assets/p-classic.png", width: 1122, height: 1402, alt: "Khao Better Classic Roasted makhana pack" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Roasted Makhana Online - Khao Better",
    description: "Roasted, never fried. Six flavours of Bihar makhana, 25 g packs from Rs 49.",
    images: ["/assets/p-classic.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
