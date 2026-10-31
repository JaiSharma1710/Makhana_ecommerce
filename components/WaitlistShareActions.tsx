"use client";

import { useState } from "react";
import { absoluteUrl } from "@/lib/site";

type CopyStatus = "idle" | "copied" | "error";

export function WaitlistShareActions({ sharePath }: { sharePath: "/" | "/join-waitlist" }) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const shareUrl = absoluteUrl(sharePath);
  const shareMessage = `Khao Better is launching soon — roasted makhana with a lot more personality. Check it out: ${shareUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  const copyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        const copied = document.execCommand("copy");
        textArea.remove();
        if (!copied) throw new Error("Copy failed");
      }
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  return (
    <div className="waitlist-share">
      <div className="waitlist-share-actions" aria-label="Optional sharing actions">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          Share on WhatsApp
        </a>
        <button type="button" onClick={copyLink}>
          {copyStatus === "copied" ? "Link copied" : "Copy link"}
        </button>
      </div>
      <p className="waitlist-share-feedback" aria-live="polite">
        {copyStatus === "copied" ? "Link copied" : copyStatus === "error" ? "Couldn’t copy the link. Please try again." : ""}
      </p>
    </div>
  );
}
