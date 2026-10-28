import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <p className="not-found-eyebrow">404 — Snack missing</p>
        <h1>This page wandered off.</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist, but the crunch is still around.</p>
        <div className="not-found-actions">
          <Link className="primary" href="/">Back to Home</Link>
          <Link className="secondary" href="/flavours">Explore Flavours</Link>
        </div>
        <Link className="not-found-tertiary" href="/why-makhana">Why Makhana?</Link>
      </div>
    </main>
  );
}
