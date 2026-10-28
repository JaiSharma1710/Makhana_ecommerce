"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

const INITIAL_CLASSIC_HOLD_MS = 12_000;
const ROTATION_HOLD_MS = 4_550;
const NEXT_IMAGE_LEAD_MS = 1_800;

export function HeroFlavourShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("active");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visibleLoaded, setVisibleLoaded] = useState(false);
  const [preloadNext, setPreloadNext] = useState(false);
  const [nextReady, setNextReady] = useState(false);
  const [hasRotated, setHasRotated] = useState(false);
  const cycleStartedAt = useRef(0);
  const active = flavours[activeIndex];
  const next = flavours[(activeIndex + 1) % flavours.length];
  const isInitialClassic = activeIndex === 0 && !hasRotated;

  useEffect(() => {
    if (reducedMotion) {
      setActiveIndex(0);
      setPhase("active");
      return;
    }

    cycleStartedAt.current = window.performance.now();
  }, [activeIndex, reducedMotion]);

  useEffect(() => {
    if (!visibleLoaded || reducedMotion) return;

    let idleId: number | undefined;
    const firstCycle = activeIndex === 0 && !hasRotated;
    const delay = firstCycle ? INITIAL_CLASSIC_HOLD_MS - NEXT_IMAGE_LEAD_MS : 900;
    const timer = window.setTimeout(() => {
      if (window.requestIdleCallback) {
        idleId = window.requestIdleCallback(() => setPreloadNext(true), { timeout: 1200 });
      } else {
        setPreloadNext(true);
      }
    }, delay);

    return () => {
      window.clearTimeout(timer);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
    };
  }, [activeIndex, hasRotated, reducedMotion, visibleLoaded]);

  useEffect(() => {
    if (!nextReady || reducedMotion) return;

    const elapsed = window.performance.now() - cycleStartedAt.current;
    const firstCycle = activeIndex === 0 && !hasRotated;
    const holdDuration = firstCycle ? INITIAL_CLASSIC_HOLD_MS : ROTATION_HOLD_MS;
    const exitDelay = Math.max(0, holdDuration - elapsed);
    const exitTimer = window.setTimeout(() => setPhase("exit"), exitDelay);
    const nextTimer = window.setTimeout(() => {
      setHasRotated(true);
      setVisibleLoaded(false);
      setPreloadNext(false);
      setNextReady(false);
      setPhase("enter");
      setActiveIndex((current) => (current + 1) % flavours.length);
    }, exitDelay + 530);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(nextTimer);
    };
  }, [activeIndex, hasRotated, nextReady, reducedMotion]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);

    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  return (
    <div className="hero-visual" aria-label="Khao Better roasted makhana flavours">
      <div className={`hero-flavour hero-flavour-${isInitialClassic ? "initial" : phase}`}>
        <div className="hero-flavour-lift">
          <Image
            src={active.src}
            alt={active.alt}
            width={1254}
            height={1254}
            preload={isInitialClassic}
            fetchPriority={isInitialClassic ? "high" : "auto"}
            decoding={isInitialClassic ? "sync" : "async"}
            quality={70}
            sizes="(max-width: 760px) calc(100vw - 34px), (max-width: 1180px) 52vw, 760px"
            onLoad={() => {
              setVisibleLoaded(true);
              if (activeIndex > 0) {
                window.setTimeout(() => setPhase("active"), 820);
              }
            }}
          />
        </div>
      </div>
      {preloadNext && !reducedMotion ? (
        <Image
          className="hero-flavour-preload"
          src={next.src}
          alt=""
          aria-hidden="true"
          width={1254}
          height={1254}
          quality={70}
          sizes="(max-width: 760px) calc(100vw - 34px), (max-width: 1180px) 52vw, 760px"
          loading="eager"
          fetchPriority="low"
          onLoad={() => setNextReady(true)}
        />
      ) : null}
    </div>
  );
}
