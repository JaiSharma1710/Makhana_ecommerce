import type { Metadata, Viewport } from "next";
import { Fredoka, Hanken_Grotesk } from "next/font/google";
import Script from "next/script";
import { MetaPixelPageView } from "@/components/MetaPixelPageView";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { META_PIXEL_ID } from "@/lib/meta-pixel";
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <MetaPixelPageView />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
