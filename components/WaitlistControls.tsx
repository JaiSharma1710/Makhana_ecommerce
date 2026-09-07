"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Product } from "@/data/store";
import { PackShot } from "@/components/PackShot";
import { trackEvent } from "@/lib/analytics";

const isValidIndianMobile = (phone: string) => /^[6-9]\d{9}$/.test(phone);

const confettiPieces = Array.from({ length: 18 }, (_, index) => index);

export function WaitlistButton({ product, className, children }: { product: Product; className?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [phoneError, setPhoneError] = useState("");
  const submittingRef = useRef(false);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  const openModal = () => {
    trackEvent("waitlist_cta_click", {
      product_id: product.id,
      product_status: product.status
    });
    setPhoneError("");
    setStatus("idle");
    submittingRef.current = false;
    setOpen(true);
    trackEvent("waitlist_modal_open", {
      product_id: product.id,
      product_status: product.status
    });
  };

  const closeModal = () => {
    if (submittingRef.current) return;
    setOpen(false);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const form = new FormData(event.currentTarget);
    const phone = String(form.get("phone") || "").replace(/\D/g, "");

    if (!isValidIndianMobile(phone)) {
      setPhoneError("Enter a valid 10-digit Indian mobile number.");
      setStatus("idle");
      return;
    }

    setPhoneError("");
    setStatus("submitting");
    submittingRef.current = true;
    trackEvent("waitlist_submit_attempt", {
      product_id: product.id,
      product_status: product.status
    });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: String(form.get("fullName") || ""),
          email: String(form.get("email") || ""),
          phone: String(form.get("phone") || ""),
          city: String(form.get("city") || ""),
          consent: form.get("consent") === "on",
          website: String(form.get("website") || ""),
          sourcePage: window.location.pathname
        })
      });
      const result = (await response.json()) as { ok?: boolean };

      if (!response.ok || result.ok !== true) throw new Error("Submission failed");

      setStatus("success");
      trackEvent("waitlist_submit_success", {
        source_page: window.location.pathname
      });
    } catch {
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <>
      <button className={className} onClick={openModal}>{children}</button>
      {open ? (
        <>
          <div className="overlay" onClick={closeModal} />
          <aside
            className="drawer"
            aria-label="Waitlist form"
            aria-modal="true"
            role="dialog"
            onKeyDown={(event) => {
              if (event.key === "Escape") closeModal();
            }}
          >
            <div className="drawer-head">
              <h2>{product.status === "out-of-stock" ? "Join the launch list" : "Notify me"}</h2>
              <button onClick={closeModal} aria-label="Close" disabled={status === "submitting"}>x</button>
            </div>
            <div className="drawer-items">
              <div className="empty">
                <PackShot id={product.id} small />
                <div className="empty-copy">
                  <h3>{product.name}</h3>
                  <p>{product.status === "out-of-stock" ? "We'll let you know when Khao Better is ready." : "This flavour is coming soon. We'll share updates closer to launch."}</p>
                </div>
              </div>
              <form className={`notify-form${status === "success" ? " is-success" : ""}`} onSubmit={submit}>
                {status === "success" ? (
                  <div className="waitlist-success" role="status" aria-live="polite">
                    <div className="success-confetti" aria-hidden="true">
                      {confettiPieces.map((piece) => <i key={piece} style={{ "--piece": piece } as React.CSSProperties} />)}
                    </div>
                    <div className="success-mark" aria-hidden="true"><span /></div>
                    <strong>YOU DID IT!</strong>
                    <h3 ref={successHeadingRef} tabIndex={-1}>You're on the Khao Better waitlist.</h3>
                    <p>We'll keep you posted about the launch.</p>
                    <button className="primary full" type="button" onClick={closeModal}>Done</button>
                  </div>
                ) : (
                  <>
                    <label htmlFor={`waitlist-name-${product.id}`}>Full name</label>
                    <input id={`waitlist-name-${product.id}`} name="fullName" type="text" placeholder="Your name" autoComplete="name" maxLength={100} autoFocus required />
                    <label htmlFor={`waitlist-email-${product.id}`}>Email address</label>
                    <input id={`waitlist-email-${product.id}`} name="email" type="email" placeholder="you@email.com" autoComplete="email" maxLength={254} required />
                    <label htmlFor={`waitlist-phone-${product.id}`}>Mobile number</label>
                    <div className={`phone-field${phoneError ? " has-error" : ""}`}>
                      <span>+91</span>
                      <input
                        id={`waitlist-phone-${product.id}`}
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        placeholder="9876543210"
                        minLength={10}
                        maxLength={10}
                        pattern="[6-9][0-9]{9}"
                        aria-invalid={phoneError ? "true" : "false"}
                        aria-describedby={phoneError ? `waitlist-phone-error-${product.id}` : undefined}
                        onInput={(event) => {
                          event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "").slice(0, 10);
                          event.currentTarget.setCustomValidity("");
                          setPhoneError("");
                        }}
                        onInvalid={(event) => {
                          event.currentTarget.setCustomValidity("Enter a valid 10-digit Indian mobile number.");
                          setPhoneError("Enter a valid 10-digit Indian mobile number.");
                        }}
                        required
                      />
                    </div>
                    {phoneError ? <p id={`waitlist-phone-error-${product.id}`} className="form-error" role="alert">{phoneError}</p> : null}
                    <label htmlFor={`waitlist-city-${product.id}`}>City <span>(optional)</span></label>
                    <input id={`waitlist-city-${product.id}`} name="city" type="text" placeholder="City" autoComplete="address-level2" maxLength={100} />
                    <div className="waitlist-honeypot" aria-hidden="true">
                      <label htmlFor={`waitlist-website-${product.id}`}>Website</label>
                      <input id={`waitlist-website-${product.id}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
                    </div>
                    <label className="consent-row" htmlFor={`waitlist-consent-${product.id}`}>
                      <input id={`waitlist-consent-${product.id}`} name="consent" type="checkbox" required />
                      <span>I agree to receive Khao Better launch updates and have read the <Link href="/privacy-policy">Privacy Policy</Link>.</span>
                    </label>
                    {status === "error" ? <p className="form-error" role="alert">Something went wrong. Please try again.</p> : null}
                    <button className="primary full" type="submit" disabled={status === "submitting"}>
                      {status === "submitting" ? "Joining..." : "Join the launch list"}
                    </button>
                  </>
                )}
              </form>
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
}
