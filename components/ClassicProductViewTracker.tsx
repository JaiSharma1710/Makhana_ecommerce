"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function ClassicProductViewTracker() {
  useEffect(() => {
    trackEvent("classic_product_view", {
      product_id: "classic",
      product_status: "out-of-stock"
    });
  }, []);

  return null;
}
