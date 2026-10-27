"use client";

import Link from "next/link";
import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { RewardWheel } from "@/components/RewardWheel";
import { trackEvent } from "@/lib/analytics";
import { trackMetaLead } from "@/lib/meta-pixel";
import {
  rewardCenterAngle,
  WheelReward,
  WheelRewardId,
  wheelRewardIndex
} from "@/lib/wheel-rewards";

export const wheelStorageKeys = {
  dismissed: "khaoBetterWheelDismissed",
  completed: "khaoBetterWheelCompleted",
  reward: "khaoBetterWheelReward"
} as const;

type WheelStage = "email" | "ready" | "spinning" | "result" | "existing";

type RewardWheelModalProps = {
  resumeRewardId?: WheelRewardId;
  sourcePage: string;
  triggerType: "time" | "scroll" | "resume";
  onClose: (stage: "email" | "wheel" | "result", completed: boolean) => void;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RewardWheelModal({ resumeRewardId, sourcePage, triggerType, onClose }: RewardWheelModalProps) {
  const resumedReward = resumeRewardId ? wheelRewardIndex[resumeRewardId] : undefined;
  const [stage, setStage] = useState<WheelStage>(resumedReward ? "result" : "email");
  const [email, setEmail] = useState("");
  const [assignedReward, setAssignedReward] = useState<WheelReward | undefined>(resumedReward);
  const [rotation, setRotation] = useState(resumedReward ? 360 - rewardCenterAngle(resumedReward.id) : 0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const busyRef = useRef(false);
  const spinningRewardRef = useRef<WheelReward | undefined>(undefined);
  const spinFallbackTimerRef = useRef<number | undefined>(undefined);

  const finishSpin = useCallback(() => {
    const reward = spinningRewardRef.current;
    if (!reward) return;
    spinningRewardRef.current = undefined;
    if (spinFallbackTimerRef.current !== undefined) {
      window.clearTimeout(spinFallbackTimerRef.current);
      spinFallbackTimerRef.current = undefined;
    }
    localStorage.setItem(wheelStorageKeys.completed, "true");
    setStage("result");
    busyRef.current = false;
    setSubmitting(false);
    trackEvent("wheel_reward", { source_page: sourcePage, reward_type: reward.id });
  }, [sourcePage]);

  useEffect(() => {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTarget = resumedReward ? resultHeadingRef.current : emailRef.current;
    window.requestAnimationFrame(() => focusTarget?.focus());

    if (resumedReward) {
      localStorage.setItem(wheelStorageKeys.completed, "true");
      trackEvent("wheel_reward", { source_page: sourcePage, reward_type: resumedReward.id });
    }

    return () => {
      if (spinFallbackTimerRef.current !== undefined) {
        window.clearTimeout(spinFallbackTimerRef.current);
      }
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [resumedReward, sourcePage]);

  useEffect(() => {
    if (stage === "result" || stage === "existing") {
      window.requestAnimationFrame(() => resultHeadingRef.current?.focus());
    }
  }, [stage]);

  const closeStage = stage === "email" ? "email" : stage === "result" || stage === "existing" ? "result" : "wheel";
  const canClose = !submitting && stage !== "spinning";

  const close = () => {
    if (!canClose || busyRef.current) return;
    trackEvent("wheel_close", { source_page: sourcePage, stage: closeStage });
    onClose(closeStage, stage === "result" || stage === "existing");
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => !element.hasAttribute("hidden"));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const submitEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busyRef.current) return;
    const form = new FormData(event.currentTarget);
    const normalizedEmail = email.trim().toLowerCase();
    if (!emailPattern.test(normalizedEmail)) {
      setError("Enter a valid email address.");
      emailRef.current?.focus();
      return;
    }
    if (form.get("consent") !== "on") {
      setError("Please confirm the launch-update consent to continue.");
      return;
    }

    busyRef.current = true;
    setSubmitting(true);
    setError("");
    trackEvent("wheel_email_submit", { source_page: sourcePage });
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flow: "reward-wheel",
          email: normalizedEmail,
          consent: form.get("consent") === "on",
          website: String(form.get("website") || ""),
          sourcePage
        })
      });
      const result = (await response.json()) as {
        ok?: boolean;
        alreadySpun?: boolean;
        rewardId?: string;
      };
      if (!response.ok || result.ok !== true) throw new Error("Submission failed");

      const reward = result.rewardId && Object.prototype.hasOwnProperty.call(wheelRewardIndex, result.rewardId)
        ? wheelRewardIndex[result.rewardId as WheelRewardId]
        : undefined;

      if (result.alreadySpun) {
        if (reward) {
          setAssignedReward(reward);
          setRotation(360 - rewardCenterAngle(reward.id));
          localStorage.setItem(wheelStorageKeys.reward, reward.id);
        }
        localStorage.setItem(wheelStorageKeys.completed, "true");
        setStage("existing");
        trackEvent("wheel_existing_reward", { source_page: sourcePage });
        return;
      }

      if (!reward) throw new Error("Invalid reward response");
      trackMetaLead();
      setAssignedReward(reward);
      localStorage.setItem(wheelStorageKeys.reward, reward.id);
      setStage("ready");
    } catch {
      setError("We couldn't verify your reward eligibility. Please try again.");
    } finally {
      busyRef.current = false;
      setSubmitting(false);
    }
  };

  const spin = () => {
    if (busyRef.current || stage !== "ready" || !assignedReward) return;
    busyRef.current = true;
    setSubmitting(true);
    trackEvent("wheel_spin", { source_page: sourcePage });
    spinningRewardRef.current = assignedReward;
    setStage("spinning");
    setRotation(5 * 360 + (360 - rewardCenterAngle(assignedReward.id)));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    spinFallbackTimerRef.current = window.setTimeout(finishSpin, reducedMotion ? 100 : 4_000);
  };

  return (
    <div className="reward-wheel-overlay" onMouseDown={(event) => {
      if (event.target === event.currentTarget) close();
    }}>
      <div
        className="reward-wheel-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reward-wheel-title"
        onKeyDown={handleDialogKeyDown}
        data-stage={stage}
        data-trigger={triggerType}
      >
        <button className="reward-wheel-close" type="button" aria-label="Close reward wheel" onClick={close} disabled={!canClose}>×</button>

        {stage === "email" ? (
          <div className="reward-wheel-email-step">
            <span className="reward-wheel-kicker">A little launch treat</span>
            <h2 id="reward-wheel-title">Spin for your launch perk</h2>
            <p>Drop your email, spin once, and we’ll save your reward for launch.</p>
            <form onSubmit={submitEmail} noValidate>
              <label htmlFor="reward-wheel-email">Email address</label>
              <input
                ref={emailRef}
                id="reward-wheel-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@email.com"
                maxLength={254}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? "reward-wheel-error" : undefined}
                required
              />
              <div className="waitlist-honeypot" aria-hidden="true">
                <label htmlFor="reward-wheel-website">Website</label>
                <input id="reward-wheel-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <label className="consent-row" htmlFor="reward-wheel-consent">
                <input id="reward-wheel-consent" name="consent" type="checkbox" required />
                <span>I agree to receive Khao Better launch updates and have read the <Link href="/privacy-policy">Privacy Policy</Link>.</span>
              </label>
              {error ? <p className="form-error" id="reward-wheel-error" role="alert">{error}</p> : null}
              <button className="primary full" type="submit" disabled={submitting}>
                {submitting ? "Unlocking..." : "Unlock my spin"}
              </button>
            </form>
          </div>
        ) : (
          <div className="reward-wheel-play-step">
            <div>
              <span className="reward-wheel-kicker">Your launch perk</span>
              <h2 id="reward-wheel-title">
                {stage === "existing"
                  ? "You’ve already unlocked your launch perk 🎉"
                  : stage === "result"
                    ? assignedReward?.resultHeading
                    : "Spin for your launch perk"}
              </h2>
              <p>
                {stage === "existing"
                  ? "We’ll send the redemption details to this email when Khao Better launches."
                  : stage === "result"
                    ? assignedReward?.resultText
                    : "One spin. One future-launch reward. Rewards are randomly assigned using the odds shown."}
              </p>
            </div>
            <RewardWheel rotation={rotation} spinning={stage === "spinning"} onSpinEnd={finishSpin} />
            {stage === "result" || stage === "existing" ? (
              <div className="reward-wheel-result" aria-live="polite">
                <h3 ref={resultHeadingRef} tabIndex={-1}>
                  {stage === "existing"
                    ? assignedReward
                      ? `Your saved reward: ${assignedReward.label}`
                      : "Your launch perk is already saved."
                    : assignedReward?.label}
                </h3>
                <button className="primary full" type="button" onClick={close}>Done</button>
              </div>
            ) : (
              <div className="reward-wheel-actions">
                <p className="reward-wheel-odds">Odds: 35% · 20% · 20% · 15% · 10%</p>
                {error ? <p className="form-error" role="alert">{error}</p> : null}
                <button className="primary full" type="button" onClick={spin} disabled={stage === "spinning"}>
                  {stage === "spinning" ? "Spinning..." : "Spin it"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
