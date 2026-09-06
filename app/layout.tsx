import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL("https://khaobetter.shop"),
  title: "Khao Better | Roasted Makhana Launching Soon",
  description:
    "Khao Better is a pre-launch Indian roasted makhana brand. Join the waitlist for Classic Roasted first-batch updates and future flavour launch news.",
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
    title: "Khao Better | Roasted Makhana Launching Soon",
    description:
      "A pre-launch Indian roasted makhana brand preparing Classic Roasted and more flavours.",
    images: [{ url: "/assets/p-classic.png", width: 1122, height: 1402, alt: "Khao Better Classic Roasted makhana pack" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Khao Better | Roasted Makhana Launching Soon",
    description: "Join the Khao Better waitlist for roasted makhana launch updates.",
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
