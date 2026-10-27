"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

export function LandingPageEffects() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".paid-waitlist-page");
    if (!page) return;

    const revealItems = Array.from(page.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    page.classList.add("is-reveal-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10%", threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return null;
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
