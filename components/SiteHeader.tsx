"use client";

import Link from "next/link";
import { useState } from "react";
import { catalog } from "@/data/store";
import { WaitlistButton } from "@/components/WaitlistControls";

const learnLinks = [
  ["Blog", "/blog"],
  ["Makhana & Weight Loss", "/blog/makhana-weight-loss"],
  ["Makhana Nutrition", "/blog/makhana-nutrition-facts"],
  ["Makhana Comparison", "/blog/makhana-vs-popcorn-vs-chips"],
  ["Office Snacks", "/office-snacks"],
  ["Student Snacks", "/student-snacks"]
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);

  return (
    <header className="header">
      <div className="container nav-row">
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen}>
          <span />
          <span />
          <span />
        </button>
        <Link className="logo-link" href="/" aria-label="Khao Better home">
          <img src="/assets/kb-logo.png" alt="Khao Better" />
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          <Link href="/shop">Shop</Link>
          <Link href="/why-makhana">Why Makhana</Link>
          <div className="learn-menu" onMouseEnter={() => setLearnOpen(true)} onMouseLeave={() => setLearnOpen(false)}>
            <button
              aria-expanded={learnOpen}
              aria-haspopup="true"
              onClick={() => setLearnOpen(!learnOpen)}
              onFocus={() => setLearnOpen(true)}
            >
              Learn
            </button>
            {learnOpen ? (
              <div className="learn-panel" onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setLearnOpen(false);
                }
              }}>
                {learnLinks.map(([label, href]) => (
                  <Link href={href} key={href} onClick={() => setLearnOpen(false)}>{label}</Link>
                ))}
              </div>
            ) : null}
          </div>
          <Link href="/our-story">Our Story</Link>
        </nav>
        <WaitlistButton product={catalog[0]} className="waitlist-button">Join Waitlist</WaitlistButton>
      </div>
      {menuOpen ? (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link href="/why-makhana" onClick={() => setMenuOpen(false)}>Why Makhana</Link>
          <span className="mobile-menu-label">Learn</span>
          {learnLinks.map(([label, href]) => (
            <Link href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
          <Link href="/our-story" onClick={() => setMenuOpen(false)}>Our Story</Link>
          <WaitlistButton product={catalog[0]}>Join Waitlist</WaitlistButton>
        </nav>
      ) : null}
    </header>
  );
}
