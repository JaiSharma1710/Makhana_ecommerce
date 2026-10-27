export const META_PIXEL_ID = "1143880034747185";

type MetaPixelCommand =
  | [command: "init", pixelId: string]
  | [command: "track", eventName: "PageView" | "Lead"];

type MetaPixelFunction = (...args: MetaPixelCommand) => void;

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
  }
}

function trackMetaEvent(eventName: "PageView" | "Lead") {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", eventName);
}

export function trackMetaPageView() {
  trackMetaEvent("PageView");
}

export function trackMetaLead() {
  trackMetaEvent("Lead");
}
