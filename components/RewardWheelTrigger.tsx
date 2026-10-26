"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { claimModal, getActiveModal, modalChangeEvent, releaseModal } from "@/lib/modal-coordination";
import { WheelRewardId, wheelRewardIndex } from "@/lib/wheel-rewards";

const LazyRewardWheelModal = dynamic(() => import("@/components/RewardWheelModal"), { ssr: false });

const storageKeys = {
  dismissed: "khaoBetterWheelDismissed",
  completed: "khaoBetterWheelCompleted",
  reward: "khaoBetterWheelReward"
} as const;

type TriggerType = "time" | "scroll" | "resume";

export function RewardWheelTrigger() {
  const [triggerType, setTriggerType] = useState<TriggerType | null>(null);
  const [resumeRewardId, setResumeRewardId] = useState<WheelRewardId | undefined>();
  const pendingTriggerRef = useRef<TriggerType | null>(null);
  const openedRef = useRef(false);
  const consumedRef = useRef(false);
  const sourcePageRef = useRef("/");

  const openWheel = useCallback((trigger: TriggerType, rewardId?: WheelRewardId) => {
    if (openedRef.current || consumedRef.current) return;
    if (!claimModal("reward-wheel")) {
      pendingTriggerRef.current = trigger;
      return;
    }
    consumedRef.current = true;
    openedRef.current = true;
    pendingTriggerRef.current = null;
    setResumeRewardId(rewardId);
    setTriggerType(trigger);
    if (trigger !== "resume") {
      trackEvent("wheel_impression", { source_page: sourcePageRef.current });
      trackEvent("wheel_open", { source_page: sourcePageRef.current, trigger_type: trigger });
    }
  }, []);

  useEffect(() => {
    sourcePageRef.current = window.location.pathname;
    if (localStorage.getItem(storageKeys.completed) === "true") return;
    if (sessionStorage.getItem(storageKeys.dismissed) === "true") return;

    const storedRewardId = localStorage.getItem(storageKeys.reward) as WheelRewardId | null;
    if (storedRewardId && storedRewardId in wheelRewardIndex) {
      openWheel("resume", storedRewardId);
      return;
    }

    let timer = window.setTimeout(() => openWheel("time"), 25_000);
    const checkScroll = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const viewedDepth = pageHeight > 0 ? (window.scrollY + window.innerHeight) / pageHeight : 0;
      if (window.scrollY > 0 && viewedDepth >= 0.55) {
        window.clearTimeout(timer);
        window.removeEventListener("scroll", checkScroll);
        openWheel("scroll");
      }
    };
    const handleModalChange = () => {
      if (!getActiveModal() && pendingTriggerRef.current) {
        const pending = pendingTriggerRef.current;
        window.requestAnimationFrame(() => openWheel(pending));
      }
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    document.addEventListener(modalChangeEvent, handleModalChange);
    checkScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", checkScroll);
      document.removeEventListener(modalChangeEvent, handleModalChange);
      if (openedRef.current) releaseModal("reward-wheel");
    };
  }, [openWheel]);

  if (!triggerType) return null;

  return (
    <LazyRewardWheelModal
      resumeRewardId={resumeRewardId}
      sourcePage={sourcePageRef.current}
      triggerType={triggerType}
      onClose={(_, completed) => {
        if (!completed) sessionStorage.setItem(storageKeys.dismissed, "true");
        openedRef.current = false;
        setTriggerType(null);
        releaseModal("reward-wheel");
      }}
    />
  );
}
