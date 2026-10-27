import type { Metadata } from "next";
import Image from "next/image";
import { PackShot } from "@/components/PackShot";
import { StandaloneWaitlistForm } from "@/components/StandaloneWaitlistForm";
import { catalog } from "@/data/store";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join the Khao Better Launch List",
  description: "Join the Khao Better waitlist for Classic Roasted first-batch and launch updates.",
  alternates: {
    canonical: absoluteUrl("/join-waitlist")
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  const product = catalog[0];

  return (
    <main className="waitlist-page">
      <div className="waitlist-page-shell">
        <section className="waitlist-page-story" aria-labelledby="waitlist-page-title">
          <Image className="waitlist-page-logo" src="/assets/kb-logo.png" alt="Khao Better" width={945} height={573} priority sizes="120px" />
          <div className="waitlist-page-kicker">Khao Better is launching soon</div>
          <h1 id="waitlist-page-title">Join the Khao Better launch list</h1>
          <p>Sign up for first-batch updates and be among the first to hear when Classic Roasted opens for orders.</p>
          <div className="waitlist-page-product">
            <PackShot id={product.id} sizes="(max-width: 760px) 128px, 180px" />
            <div>
              <span>First flavour</span>
              <h2>Classic Roasted</h2>
              <p>25 g pack · Rs. 59 · Currently out of stock</p>
            </div>
          </div>
          <ul className="waitlist-page-points">
            <li>First-batch launch updates</li>
            <li>Future flavour news</li>
            <li>No checkout or payment today</li>
          </ul>
        </section>

        <section className="waitlist-page-card" aria-labelledby="waitlist-form-title">
          <div className="waitlist-page-form-head">
            <span>Pre-launch signup</span>
            <h2 id="waitlist-form-title">Save your place on the list</h2>
            <p>Enter your details below and we'll keep you posted.</p>
          </div>
          <StandaloneWaitlistForm product={product} />
        </section>
      </div>
      <p className="waitlist-page-foot">© 2026 Khao Better · Roasted makhana for everyday snacking.</p>
    </main>
  );
}
