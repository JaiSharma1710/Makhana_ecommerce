"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Product } from "@/data/store";
import { trackEvent } from "@/lib/analytics";
import { trackMetaLead } from "@/lib/meta-pixel";

const isValidIndianMobile = (phone: string) => /^[6-9]\d{9}$/.test(phone);
const confettiPieces = Array.from({ length: 18 }, (_, index) => index);

export function StandaloneWaitlistForm({ product }: { product: Product }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [phoneError, setPhoneError] = useState("");
  const submittingRef = useRef(false);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

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
      trackMetaLead();
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
    <form className={`notify-form waitlist-page-form${status === "success" ? " is-success" : ""}`} onSubmit={submit}>
      {status === "success" ? (
        <div className="waitlist-success" role="status" aria-live="polite">
          <div className="success-confetti" aria-hidden="true">
            {confettiPieces.map((piece) => <i key={piece} style={{ "--piece": piece } as React.CSSProperties} />)}
          </div>
          <div className="success-mark" aria-hidden="true"><span /></div>
          <strong>YOU'RE IN</strong>
          <h2 ref={successHeadingRef} tabIndex={-1}>You're on the Khao Better waitlist.</h2>
          <p>We'll keep you posted when it's time to crunch.</p>
          <Link className="primary full" href="/">Explore Khao Better</Link>
        </div>
      ) : (
        <>
          <label htmlFor="waitlist-page-name">Full name</label>
          <input id="waitlist-page-name" name="fullName" type="text" placeholder="Your name" autoComplete="name" maxLength={100} required />

          <label htmlFor="waitlist-page-email">Email address</label>
          <input id="waitlist-page-email" name="email" type="email" placeholder="you@email.com" autoComplete="email" maxLength={254} required />

          <label htmlFor="waitlist-page-phone">Mobile number</label>
          <div className={`phone-field${phoneError ? " has-error" : ""}`}>
            <span>+91</span>
            <input
              id="waitlist-page-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="10-digit mobile number"
              minLength={10}
              maxLength={10}
              pattern="[6-9][0-9]{9}"
              aria-invalid={phoneError ? "true" : "false"}
              aria-describedby={phoneError ? "waitlist-page-phone-error" : undefined}
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
          {phoneError ? <p id="waitlist-page-phone-error" className="form-error" role="alert">{phoneError}</p> : null}

          <label htmlFor="waitlist-page-city">City <span>(optional)</span></label>
          <input id="waitlist-page-city" name="city" type="text" placeholder="City" autoComplete="address-level2" maxLength={100} />

          <div className="waitlist-honeypot" aria-hidden="true">
            <label htmlFor="waitlist-page-website">Website</label>
            <input id="waitlist-page-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <label className="consent-row" htmlFor="waitlist-page-consent">
            <input id="waitlist-page-consent" name="consent" type="checkbox" required />
            <span>I agree to receive Khao Better launch updates and have read the <Link href="/privacy-policy">Privacy Policy</Link>.</span>
          </label>

          {status === "error" ? <p className="form-error" role="alert">Something went wrong. Please try again.</p> : null}
          <button className="primary full" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Joining..." : <>Join the launch list <span aria-hidden="true">→</span></>}
          </button>
          <p className="waitlist-page-reassurance">No spam. Just launch updates, flavour news and Khao Better drops.</p>
        </>
      )}
    </form>
  );
}
