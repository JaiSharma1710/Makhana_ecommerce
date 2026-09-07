import type { Metadata } from "next";
import Link from "next/link";
import { StorefrontShell } from "@/components/Storefront";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Khao Better",
  description: "How Khao Better collects and uses information submitted through its pre-launch waitlist.",
  alternates: {
    canonical: absoluteUrl("/privacy-policy")
  },
  openGraph: {
    title: "Privacy Policy | Khao Better",
    description: "How Khao Better collects and uses information submitted through its pre-launch waitlist.",
    url: absoluteUrl("/privacy-policy")
  }
};

export default function PrivacyPolicyPage() {
  return (
    <StorefrontShell>
      <main className="page-pad privacy-page">
        <div className="container privacy-content">
          <div className="crumb"><Link href="/">Home</Link> / <b>Privacy Policy</b></div>
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-intro">This notice explains how information shared through the Khao Better pre-launch waitlist is handled.</p>

          <section>
            <h2>Information we collect</h2>
            <p>The waitlist may collect your name, email address, mobile phone number, optional city, and your consent preference.</p>
          </section>

          <section>
            <h2>How we use it</h2>
            <p>We use this information to manage the Khao Better pre-launch waitlist, send the launch or product updates you requested, and understand broad geographic interest when you choose to provide a city.</p>
          </section>

          <section>
            <h2>Service providers and analytics</h2>
            <p>Waitlist form and contact information is processed and stored using HubSpot as our CRM and form service.</p>
            <p>We may also collect website analytics using Google Analytics. We do not intentionally send the personal information listed above in waitlist analytics events.</p>
          </section>

          <section>
            <h2>Your choice</h2>
            <p>Joining the waitlist is optional. Only submit the form if you agree to receive Khao Better launch updates.</p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>Contact details will be added here once an official support channel is available.</p>
          </section>
        </div>
      </main>
    </StorefrontShell>
  );
}
