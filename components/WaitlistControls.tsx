"use client";

import { FormEvent, useState } from "react";
import { Product } from "@/data/store";
import { PackShot } from "@/components/PackShot";
import { trackEvent } from "@/lib/analytics";

export function WaitlistButton({ product, className, children }: { product: Product; className?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const openModal = () => {
    trackEvent("waitlist_cta_click", {
      product_id: product.id,
      product_status: product.status
    });
    setOpen(true);
    trackEvent("waitlist_modal_open", {
      product_id: product.id,
      product_status: product.status
    });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const phone = String(form.get("phone") || "").replace(/\D/g, "");

    if (phone.length !== 10 || !/^[6-9]/.test(phone)) {
      setPhoneError("Enter a valid 10-digit Indian mobile number.");
      setNotice("");
      return;
    }

    setPhoneError("");
    trackEvent("waitlist_submit_attempt", {
      product_id: product.id,
      product_status: product.status
    });
    setNotice("Thanks for your interest. Khao Better will share launch updates when online signup opens fully.");
  };

  return (
    <>
      <button className={className} onClick={openModal}>{children}</button>
      {open ? (
        <>
          <div className="overlay" onClick={() => setOpen(false)} />
          <aside className="drawer" aria-label="Waitlist form">
            <div className="drawer-head">
              <h2>{product.status === "out-of-stock" ? "Join the launch list" : "Notify me"}</h2>
              <button onClick={() => setOpen(false)} aria-label="Close">x</button>
            </div>
            <div className="drawer-items">
              <div className="empty">
                <PackShot id={product.id} small />
                <h3>{product.name}</h3>
                <p>{product.status === "out-of-stock" ? "We'll let you know when Khao Better is ready." : "This flavour is coming soon. We'll share updates closer to launch."}</p>
              </div>
              <form className="notify-form" onSubmit={submit}>
                <label htmlFor={`waitlist-name-${product.id}`}>Full name</label>
                <input id={`waitlist-name-${product.id}`} name="name" type="text" placeholder="Your name" required />
                <label htmlFor={`waitlist-email-${product.id}`}>Email address</label>
                <input id={`waitlist-email-${product.id}`} name="email" type="email" placeholder="you@email.com" required />
                <label htmlFor={`waitlist-phone-${product.id}`}>Mobile number</label>
                <div className="phone-field">
                  <span>+91</span>
                  <input id={`waitlist-phone-${product.id}`} name="phone" type="tel" inputMode="numeric" placeholder="9876543210" required />
                </div>
                {phoneError ? <p className="form-error" role="alert">{phoneError}</p> : null}
                <label htmlFor={`waitlist-city-${product.id}`}>City <span>(optional)</span></label>
                <input id={`waitlist-city-${product.id}`} name="city" type="text" placeholder="City" />
                <label className="consent-row" htmlFor={`waitlist-consent-${product.id}`}>
                  <input id={`waitlist-consent-${product.id}`} name="consent" type="checkbox" required />
                  <span>I agree to receive Khao Better launch updates.</span>
                </label>
                <button className="primary full" type="submit">Join the launch list</button>
                {notice ? <p role="status">{notice}</p> : null}
              </form>
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
}
