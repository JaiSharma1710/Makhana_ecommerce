"use client";

import type { ReactNode } from "react";
import { ScrollRevealEffects } from "@/components/ScrollRevealEffects";

export function LandingPageEffects() {
  return <ScrollRevealEffects rootSelector=".paid-waitlist-page" />;
}

export function LandingFormCta({ children, className = "" }: { children: ReactNode; className?: string }) {
  const focusForm = () => {
    const formSection = document.getElementById("waitlist-form");
    const firstInput = formSection?.querySelector<HTMLInputElement>('input:not([type="hidden"])');
    if (!formSection || !firstInput) return;

    firstInput.focus({ preventScroll: true });
    formSection.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  };

  return (
    <button className={className} type="button" onClick={focusForm}>
      {children}<span aria-hidden="true">→</span>
    </button>
  );
}
