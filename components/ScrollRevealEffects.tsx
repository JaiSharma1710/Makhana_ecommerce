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
      const showItems = (node: ParentNode) => itemsWithin(node).forEach((item) => item.classList.add("is-visible", "is-reveal-complete"));
      showItems(root);
      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.matches(revealSelector)) node.classList.add("is-visible", "is-reveal-complete");
            showItems(node);
          }
        }));
      });
      mutationObserver.observe(root, { childList: true, subtree: true });
      return () => mutationObserver.disconnect();
    }

    root.classList.add(readyClass);
    const completionTimers = new Set<number>();
    const observedItems = new WeakSet<HTMLElement>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const item = entry.target as HTMLElement;
        const configuredDelay = Number.parseFloat(window.getComputedStyle(item).getPropertyValue("--reveal-delay")) || 0;
        item.classList.add("is-visible");
        observer.unobserve(item);
        const timer = window.setTimeout(() => {
          item.classList.add("is-reveal-complete");
          completionTimers.delete(timer);
        }, (item.hasAttribute("data-reveal-group") ? 1150 : 700) + configuredDelay);
        completionTimers.add(timer);
      });
    }, { rootMargin: "0px 0px -10%", threshold: 0.12 });

    const observeItem = (item: HTMLElement) => {
      if (observedItems.has(item) || item.classList.contains("is-reveal-complete")) return;
      observedItems.add(item);
      observer.observe(item);
    };
    const observeItems = (node: ParentNode) => itemsWithin(node).forEach(observeItem);

    observeItems(root);
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches(revealSelector)) observeItem(node);
        observeItems(node);
      }));
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      completionTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [readyClass, rootSelector]);

  return null;
}
