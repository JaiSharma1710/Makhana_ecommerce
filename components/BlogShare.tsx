"use client";

import { useState } from "react";

type BlogShareProps = {
  title: string;
  url: string;
};

export function BlogShare({ title, url }: BlogShareProps) {
  const [copied, setCopied] = useState(false);
  const shareText = `${title} — ${url}`;
  const links = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(shareText)}`
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    }
  ];

  async function copyLink() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement("textarea");
        input.value = url;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        const copiedWithFallback = document.execCommand("copy");
        document.body.removeChild(input);
        if (!copiedWithFallback) throw new Error("Copy command was not available");
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <aside className="blog-share" aria-label="Share this article">
      <strong>Share this guide</strong>
      <div className="blog-share-actions">
        {links.map((link) => (
          <a href={link.href} key={link.label} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        ))}
        <button type="button" onClick={copyLink}>{copied ? "Link copied" : "Copy link"}</button>
      </div>
      <span className="blog-share-status" role="status" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </aside>
  );
}
