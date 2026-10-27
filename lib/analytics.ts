import { SITE_HOSTNAME } from "@/lib/site";

export const GA_MEASUREMENT_ID = "G-H55M49RS7Y";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: AnalyticsParams) => void;
  }
}

export function isProductionAnalyticsHostname(hostname: string) {
  return hostname === SITE_HOSTNAME;
}

export function trackEvent(eventName: string, params?: AnalyticsParams) {
  if (
    typeof window === "undefined" ||
    !isProductionAnalyticsHostname(window.location.hostname) ||
    typeof window.gtag !== "function"
  ) {
    return;
  }

  window.gtag("event", eventName, params);
}
