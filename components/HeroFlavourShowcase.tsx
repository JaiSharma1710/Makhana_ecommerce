"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const flavours = [
  {
    name: "Classic",
    src: "/assets/hero-flavours/classic.png",
    alt: "Khao Better Classic Roasted Makhana"
  },
  {
    name: "Peri Peri",
    src: "/assets/hero-flavours/peri-peri.png",
    alt: "Khao Better Peri Peri Roasted Makhana"
  },
  {
    name: "Pudina Punch",
    src: "/assets/hero-flavours/pudina-punch.png",
    alt: "Khao Better Pudina Punch Roasted Makhana"
  },
  {
    name: "Achari Chatpata",
    src: "/assets/hero-flavours/achari-chatpata.png",
    alt: "Khao Better Achari Chatpata Roasted Makhana"
  },
  {
    name: "Tangy Tomato",
    src: "/assets/hero-flavours/tangy-tomato.png",
    alt: "Khao Better Tangy Tomato Roasted Makhana"
  },
  {
    name: "Cheese & Herb",
    src: "/assets/hero-flavours/cheese-herb.png",
    alt: "Khao Better Cheese & Herb Roasted Makhana"
  }
];

type Phase = "enter" | "active" | "exit";

export function HeroFlavourShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("enter");
  const [reducedMotion, setReducedMotion] = useState(false);
  const active = flavours[activeIndex];

  useEffect(() => {
    if (reducedMotion) {
      setActiveIndex(0);
      setPhase("active");
      return;
    }

    const enterTimer = window.setTimeout(() => setPhase("active"), 820);
    const exitTimer = window.setTimeout(() => setPhase("exit"), 4550);
    const nextTimer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % flavours.length);
      setPhase("enter");
    }, 5080);

    return () => {
      window.clearTimeout(enterTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(nextTimer);
    };
  }, [activeIndex, reducedMotion]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);

    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const next = flavours[(activeIndex + 1) % flavours.length];
    const preload = new window.Image();
    preload.src = next.src;
  }, [activeIndex, reducedMotion]);

  return (
    <div className="hero-visual" aria-label="Khao Better roasted makhana flavours">
      <div className={`hero-flavour hero-flavour-${phase}`} key={active.src}>
        <div className="hero-flavour-lift">
          <Image
            src={active.src}
            alt={active.alt}
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 760px) 100vw, (max-width: 1180px) 52vw, 760px"
          />
        </div>
      </div>
    </div>
  );
}
