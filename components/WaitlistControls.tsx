"use client";

import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";
import { Product } from "@/data/store";
import { trackEvent } from "@/lib/analytics";
import { claimModal, releaseModal } from "@/lib/modal-coordination";

type DrawerProps = { product: Product; onClose: () => void };

let drawerModulePromise: Promise<{ default: ComponentType<DrawerProps> }> | undefined;

const loadWaitlistDrawer = () => {
  drawerModulePromise ??= import("@/components/WaitlistDrawer");
  return drawerModulePromise;
};

export function WaitlistButton({ product, className, children }: { product: Product; className?: string; children: React.ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [Drawer, setDrawer] = useState<ComponentType<DrawerProps> | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const ownsModalRef = useRef(false);

  useEffect(() => () => {
    if (ownsModalRef.current) releaseModal("waitlist");
  }, []);

  const prepareDrawer = () => {
    void loadWaitlistDrawer().then((module) => setDrawer(() => module.default));
  };

  const openDrawer = () => {
    if (!claimModal("waitlist")) return;
    ownsModalRef.current = true;
    trackEvent("waitlist_cta_click", {
      product_id: product.id,
      product_status: product.status
    });
    setSelectedProduct(product);
    prepareDrawer();
    trackEvent("waitlist_modal_open", {
      product_id: product.id,
      product_status: product.status
    });
  };

  const closeDrawer = () => {
    setSelectedProduct(null);
    ownsModalRef.current = false;
    releaseModal("waitlist");
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <>
      <button
        ref={triggerRef}
        className={className}
        onClick={openDrawer}
        onFocus={prepareDrawer}
        onPointerEnter={prepareDrawer}
      >
        {children}
      </button>
      {selectedProduct && Drawer ? <Drawer product={selectedProduct} onClose={closeDrawer} /> : null}
    </>
  );
}
