"use client";

import { useEffect } from "react";

type ScrollRevealEffectsProps = {
  rootSelector: string;
  readyClass?: string;
};

export function ScrollRevealEffects({ rootSelector, readyClass = "is-reveal-ready" }: ScrollRevealEffectsProps) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(rootSelector);
    if (!root) return;

    const revealSelector = "[data-reveal], [data-reveal-group]";
    const itemsWithin = (node: ParentNode) => Array.from(node.querySelectorAll<HTMLElement>(revealSelector));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      itemsWithin(root).forEach((item) => item.classList.add("is-visible", "is-reveal-complete"));
      return;
    }

    root.classList.add(readyClass);
    const completionTimers = new Set<number>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const item = entry.target as HTMLElement;
        const configuredDelay = Number.parseFloat(item.style.getPropertyValue("--reveal-delay")) || 0;
        item.classList.add("is-visible");
        observer.unobserve(item);
        const timer = window.setTimeout(() => {
          item.classList.add("is-reveal-complete");
          completionTimers.delete(timer);
        }, (item.hasAttribute("data-reveal-group") ? 1150 : 700) + configuredDelay);
        completionTimers.add(timer);
      });
    }, { rootMargin: "0px 0px -10%", threshold: 0.12 });

    itemsWithin(root).forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      completionTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [readyClass, rootSelector]);

  return null;
}
