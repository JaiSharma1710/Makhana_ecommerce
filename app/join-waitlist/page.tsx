import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./landing.css";
import { LandingFormCta, LandingPageEffects } from "@/components/LandingWaitlistInteractions";
import { PackShot } from "@/components/PackShot";
import { StandaloneWaitlistForm } from "@/components/StandaloneWaitlistForm";
import { catalog } from "@/data/store";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join the Khao Better Launch List",
  description: "Join the Khao Better pre-launch list for launch updates, flavour news and upcoming roasted makhana drops.",
  alternates: { canonical: absoluteUrl("/join-waitlist") },
  robots: { index: false, follow: true }
};

const benefits = [
  ["megaphone", "Launch updates", "Be the first to know when Khao Better officially opens for orders."],
  ["bowl", "Flavour drops", "Hear about new Khao Better flavours as they move from “coming soon” to ready-to-crunch."],
  ["gift", "Launch perks", "If a launch perk is attached to your email, we'll send the redemption details when orders open."]
] as const;

const proofPoints = [
  ["leaf", "0% fried", "100% roasted"],
  ["pack", "25 g", "Classic pack"],
  ["price", "₹59", "Classic price"],
  ["cubes", "0 g", "Added sugar"]
] as const;

const faqs = [
  ["Can I order Khao Better right now?", "Not yet. Khao Better is currently pre-launch. Join the launch list and we'll let you know when orders open."],
  ["Which flavour launches first?", "Classic Roasted is the first planned Khao Better flavour, with the rest of the flavour range planned to follow."],
  ["What happens after I join?", "We'll use the details you provide to send relevant Khao Better launch updates. You can unsubscribe from marketing communications at any time."]
] as const;

function BenefitIcon({ type }: { type: (typeof benefits)[number][0] }) {
  if (type === "megaphone") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 20v9h7l17 8V12L15 20H8Z" /><path d="m16 29 3 10h6l-2-7M36 17l6-4M37 24h7M36 31l6 4" /></svg>;
  }
  if (type === "bowl") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 24h32c-1 11-7 16-16 16S9 35 8 24Z" /><circle cx="16" cy="19" r="4" /><circle cx="25" cy="16" r="5" /><circle cx="34" cy="20" r="4" /><path d="m37 8 1 4 4 1-4 1-1 4-1-4-4-1 4-1 1-4Z" /></svg>;
  }
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 20h32v22H8zM6 14h36v8H6zM24 14v28" /><path d="M24 14c-8 0-12-2-12-6 0-3 2-5 5-5 5 0 7 7 7 11Zm0 0c8 0 12-2 12-6 0-3-2-5-5-5-5 0-7 7-7 11Z" /></svg>;
}

function ProofIcon({ type }: { type: (typeof proofPoints)[number][0] }) {
  if (type === "leaf") return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M32 7C18 8 9 14 9 25c0 5 4 8 8 8 10 0 15-10 15-26Z" /><path d="M8 34c5-8 10-13 20-20" /></svg>;
  if (type === "pack") return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M12 10h16l3 24H9l3-24Z" /><path d="M14 10V6h12v4M16 20h8M20 16v8" /></svg>;
  if (type === "price") return <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="15" /><path d="M14 12h13M14 17h13M16 12c6 0 8 2 8 5s-3 5-8 5h-2l11 8" /></svg>;
  return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="m20 7 8 4-8 4-8-4 8-4ZM12 11v9l8 4v-9M28 11v9l-8 4M10 23l7 4-7 4-7-4 7-4ZM3 27v7l7 4v-7M17 27v7l-7 4M30 23l7 4-7 4-7-4 7-4ZM23 27v7l7 4v-7M37 27v7l-7 4" /></svg>;
}

function TrustIcon({ type }: { type: "calendar" | "cart" | "mail" }) {
  if (type === "calendar") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4v3M19 4v3M4 8h16v12H4zM8 12h3v3H8z" /></svg>;
  if (type === "cart") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h3l2 10h10l2-7H7M10 20h.01M18 20h.01" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v13H3zM4 7l8 7 8-7" /></svg>;
}

export default function JoinWaitlistPage() {
  const classic = catalog[0];

  return (
    <div className="paid-waitlist-page">
      <LandingPageEffects />
      <header className="paid-waitlist-header">
        <div className="paid-waitlist-container paid-waitlist-header-inner">
          <Link href="/" aria-label="Khao Better home">
            <Image src="/assets/kb-logo.png" alt="Khao Better" width={945} height={573} sizes="96px" />
          </Link>
          <Link className="paid-waitlist-explore" href="/">Explore Khao Better <span aria-hidden="true">→</span></Link>
        </div>
      </header>

      <main>
        <section className="paid-waitlist-hero" aria-labelledby="paid-waitlist-title">
          <div className="paid-waitlist-container paid-waitlist-hero-grid">
            <div className="paid-waitlist-hero-copy">
              <span className="paid-waitlist-eyebrow">Coming soon</span>
              <h1 id="paid-waitlist-title">Makhana got a <span>personality.</span></h1>
              <p className="paid-waitlist-lead">Khao Better is bringing roasted makhana into its main-character era — crunchy, flavour-first and built for everyday snacking.</p>
              <p>Classic Roasted is first up, with more flavours planned to follow.</p>
            </div>

            <div className="paid-waitlist-product-world" aria-label="Khao Better Classic Roasted makhana pack">
              <div className="paid-waitlist-blob" aria-hidden="true" />
              <span className="paid-waitlist-doodle paid-waitlist-doodle-left" aria-hidden="true" />
              <span className="paid-waitlist-doodle paid-waitlist-doodle-right" aria-hidden="true" />
              {[1, 2, 3, 4, 5].map((piece) => <i className={`paid-waitlist-makhana piece-${piece}`} key={piece} aria-hidden="true" />)}
              <Image
                className="paid-waitlist-hero-pack"
                src="/assets/p-classic.png"
                alt="Khao Better Classic Roasted makhana pack"
                width={1145}
                height={1374}
                priority
                sizes="(max-width: 760px) 58vw, (max-width: 1100px) 36vw, 330px"
              />
            </div>

            <section id="waitlist-form" className="paid-waitlist-form-card" aria-labelledby="waitlist-form-title">
              <div className="paid-waitlist-form-head">
                <span>Pre-launch signup</span>
                <h2 id="waitlist-form-title">Get first dibs.</h2>
                <p>Join the Khao Better launch list and we'll let you know when we're ready to crunch.</p>
              </div>
              <StandaloneWaitlistForm product={classic} />
            </section>

            <ul className="paid-waitlist-trust" aria-label="Waitlist reassurance">
              <li><TrustIcon type="calendar" />Pre-launch only</li>
              <li><TrustIcon type="cart" />No checkout today</li>
              <li><TrustIcon type="mail" />Unsubscribe anytime</li>
            </ul>
          </div>
        </section>

        <section className="paid-waitlist-benefits" aria-labelledby="why-join-title" data-reveal>
          <div className="paid-waitlist-container paid-waitlist-benefit-strip">
            <div className="paid-waitlist-benefit-heading">
              <h2 id="why-join-title">Why join the<br />launch list?</h2>
              <span className="paid-waitlist-underline" aria-hidden="true" />
            </div>
            {benefits.map(([icon, title, copy], index) => (
              <article style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties} key={title} data-reveal>
                <BenefitIcon type={icon} />
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="paid-waitlist-section paid-waitlist-flavours" aria-labelledby="flavour-title">
          <div className="paid-waitlist-container">
            <div className="paid-waitlist-section-heading" data-reveal>
              <span className="paid-waitlist-heading-rays" aria-hidden="true" />
              <h2 id="flavour-title">Six flavours. Zero boring energy.</h2>
              <p>Classic Roasted leads the launch. The rest of the Khao Better flavour universe is waiting in the wings.</p>
              <Image className="paid-waitlist-chef" src="/assets/landing-waitlist/mascot-chef.png" alt="" width={585} height={559} sizes="130px" />
            </div>
            <div className="paid-waitlist-flavour-grid">
              {catalog.map((product, index) => (
                <article
                  className={`paid-waitlist-flavour-card${product.id === "classic" ? " is-classic" : ""}`}
                  style={{ "--flavour-tint": product.tint, "--reveal-delay": `${index * 70}ms` } as CSSProperties}
                  key={product.id}
                  data-reveal
                >
                  <PackShot id={product.id} sizes="(max-width: 760px) 38vw, (max-width: 1100px) 24vw, 145px" />
                  <h3>{product.name}</h3>
                  <span>{product.id === "classic" ? "Launching first" : "Coming soon"}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="paid-waitlist-section paid-waitlist-story" aria-labelledby="why-khao-better-title">
          <div className="paid-waitlist-container paid-waitlist-story-grid">
            <div className="paid-waitlist-mascot-wrap" data-reveal>
              <Image src="/assets/landing-waitlist/mascot-cool.png" alt="A cheerful makhana mascot wearing sunglasses" width={585} height={559} sizes="(max-width: 760px) 180px, 230px" />
            </div>
            <div className="paid-waitlist-story-copy" data-reveal>
              <h2 id="why-khao-better-title">Makhana, minus the lecture.</h2>
              <p>We like makhana. We just don't think it needs to feel like homework.</p>
              <p>Khao Better is being built as a snack brand first — crunchy, flavourful, easy to grab and a little more fun to have around.</p>
            </div>
            <div className="paid-waitlist-proof-grid">
              {proofPoints.map(([icon, value, label], index) => (
                <div style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties} key={label} data-reveal>
                  <ProofIcon type={icon} /><b>{value}</b><span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="paid-waitlist-personality" aria-labelledby="personality-title">
          <div className="paid-waitlist-container paid-waitlist-personality-inner">
            <i className="paid-waitlist-banner-piece banner-piece-1" aria-hidden="true" />
            <i className="paid-waitlist-banner-piece banner-piece-2" aria-hidden="true" />
            <div data-reveal>
              <h2 id="personality-title">Your snack break called.<br />It wants better taste.</h2>
              <p>No wellness sermon. No boring beige energy.<br />Just roasted makhana with a little more personality.</p>
            </div>
            <Image className="paid-waitlist-bowl-mascot" src="/assets/landing-waitlist/mascot-bowl.png" alt="A makhana mascot relaxing in a bowl of makhana" width={585} height={559} sizes="(max-width: 760px) 190px, 270px" />
          </div>
        </section>

        <section className="paid-waitlist-section paid-waitlist-faq" aria-labelledby="faq-title">
          <div className="paid-waitlist-container paid-waitlist-faq-grid">
            <div data-reveal>
              <span className="paid-waitlist-eyebrow">Quick answers</span>
              <h2 id="faq-title">Before<br />you join</h2>
              <span className="paid-waitlist-underline" aria-hidden="true" />
            </div>
            <div data-reveal>
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}<span aria-hidden="true" /></summary>
                  <div className="paid-waitlist-faq-answer"><p>{answer}</p></div>
                </details>
              ))}
              <details>
                <summary>Where can I learn more about Khao Better?<span aria-hidden="true" /></summary>
                <div className="paid-waitlist-faq-answer"><p>Visit the <Link href="/">main Khao Better website</Link> to explore the brand, makhana guides and upcoming flavours.</p></div>
              </details>
            </div>
          </div>
        </section>

        <section className="paid-waitlist-final-wrap">
          <div className="paid-waitlist-container">
            <div className="paid-waitlist-final" data-reveal>
              <i className="paid-waitlist-final-piece final-piece-1" aria-hidden="true" />
              <i className="paid-waitlist-final-piece final-piece-2" aria-hidden="true" />
              <h2>Ready when we are?</h2>
              <p>Join the launch list and be there when Khao Better officially drops.</p>
              <LandingFormCta className="paid-waitlist-primary paid-waitlist-primary-light">Join the launch list</LandingFormCta>
            </div>
          </div>
        </section>
      </main>

      <footer className="paid-waitlist-footer">
        <div className="paid-waitlist-container">
          <Link href="/" aria-label="Khao Better home"><Image src="/assets/kb-logo.png" alt="Khao Better" width={945} height={573} sizes="82px" /></Link>
          <div><Link href="/privacy-policy">Privacy Policy</Link><Link href="/">Explore Khao Better <span aria-hidden="true">→</span></Link></div>
        </div>
      </footer>
    </div>
  );
}
