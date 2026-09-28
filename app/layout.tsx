import type { Metadata, Viewport } from "next";
import { Fredoka, Hanken_Grotesk } from "next/font/google";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  display: "swap"
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap"
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "Khao Better | Roasted Makhana Launching Soon",

  description:
    "Khao Better is a pre-launch Indian roasted makhana brand. Join the waitlist for Classic Roasted first-batch updates and future flavour launch news.",

  alternates: {
    canonical: absoluteUrl("/")
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
    url: absoluteUrl("/"),
    siteName: "Khao Better",
    title: "Khao Better | Roasted Makhana Launching Soon",
    description:
      "A pre-launch Indian roasted makhana brand preparing Classic Roasted and more flavours.",
    images: [
      {
        url: absoluteUrl("/assets/p-classic.png"),
        width: 1122,
        height: 1402,
        alt: "Khao Better Classic Roasted makhana pack"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Khao Better | Roasted Makhana Launching Soon",
    description:
      "Join the Khao Better waitlist for roasted makhana launch updates.",
    images: [absoluteUrl("/assets/p-classic.png")]
  },

  other: {
    "p:domain_verify": "215944583f767a5d440bc8e2d36862a6"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${hankenGrotesk.variable} ${fredoka.variable}`}>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
