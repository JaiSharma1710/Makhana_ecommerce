"use client";

import Link from "next/link";
import { useState } from "react";
import { catalog } from "@/data/store";
import { categoryUrl, populatedBlogCategories } from "@/lib/blog-posts";
import { WaitlistButton } from "@/components/WaitlistControls";

const exploreSections = [
  {
    label: "Learn / Journal",
    links: [
      ["Journal", "/blog"],
      ["Makhana 101", "/why-makhana"],
      ...populatedBlogCategories.map((category) => [category.label, categoryUrl(category.slug)])
    ]
  },
  {
    label: "Everyday Guides",
    links: [
      ["Office Snacks", "/office-snacks"],
      ["Student Snacks", "/student-snacks"]
    ]
  }
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
              Explore
            </button>
            {learnOpen ? (
              <div className="learn-panel" onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setLearnOpen(false);
                }
              }}>
                {exploreSections.map((section) => (
                  <div className="learn-panel-section" key={section.label}>
                    <span className="learn-panel-label">{section.label}</span>
                    {section.links.map(([label, href]) => (
                      <Link href={href} key={href} onClick={() => setLearnOpen(false)}>{label}</Link>
                    ))}
                  </div>
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
          {exploreSections.map((section) => (
            <div className="mobile-menu-section" key={section.label}>
              <span className="mobile-menu-label">{section.label}</span>
              {section.links.map(([label, href]) => (
                <Link href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</Link>
              ))}
            </div>
          ))}
          <Link href="/our-story" onClick={() => setMenuOpen(false)}>Our Story</Link>
          <WaitlistButton product={catalog[0]}>Join Waitlist</WaitlistButton>
        </nav>
      ) : null}
    </header>
  );
}
