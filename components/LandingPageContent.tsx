import Link from "next/link";
import { LandingPageData } from "@/data/landing";
import { absoluteUrl } from "@/lib/site";

export function LandingPageContent({ page }: { page: LandingPageData }) {
  const pageUrl = absoluteUrl(`/${page.slug}`);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: page.h1, item: pageUrl }
    ]
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };

  return (
    <main className="landing-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="landing-hero">
        <div className="container">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <b>{page.h1}</b>
          </nav>
          <div className="eyebrow">{page.eyebrow}</div>
          <h1>{page.h1}</h1>
          {page.intro.map((paragraph) => <p key={paragraph}>{renderLinks(paragraph, page.links)}</p>)}
        </div>
      </section>
      <div className="container landing-body">
        {page.sections.map((section) => (
          <section className="landing-section" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body?.map((paragraph) => <p key={paragraph}>{renderLinks(paragraph, page.links)}</p>)}
            {section.cards ? (
              <ol className="landing-card-grid landing-card-list">
                {section.cards.map((card) => (
                  <li className="landing-card" key={card.title}>
                    <h3>{card.title}</h3>
                    {card.body.map((paragraph) => <p key={paragraph}>{renderLinks(paragraph, page.links)}</p>)}
                  </li>
                ))}
              </ol>
            ) : null}
            {section.table ? <LandingTable rows={section.table} /> : null}
            {section.chips ? <div className="location-chips">{section.chips.map((chip) => <span key={chip}>{chip}</span>)}</div> : null}
          </section>
        ))}
        <section className="landing-section">
          <h2>{page.slug === "office-snacks" ? "Office Snack FAQs" : page.slug === "student-snacks" ? "Hostel Snack FAQs" : "Delhi Snacking FAQs"}</h2>
          <div className="landing-faqs">
            {page.faqs.map(([question, answer]) => (
              <article className="faq static-faq" key={question}>
                <h3>{question}</h3>
                <p>{renderLinks(answer, page.links)}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="landing-cta">
          <h2>Keep Exploring Khao Better</h2>
          <div className="inline-links">
            {page.links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
          </div>
        </section>
      </div>
    </main>
  );
}

function LandingTable({ rows }: { rows: string[][] }) {
  const [head, ...body] = rows;
  return (
    <div className="table-scroll">
      <table>
        <thead><tr>{head.map((cell) => <th key={cell}>{cell}</th>)}</tr></thead>
        <tbody>{body.map((row) => <tr key={row.join("-")}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function renderLinks(text: string, links: LandingPageData["links"]) {
  const match = links.find((link) => text.includes(link.label));
  if (!match) return text;
  const [before, after] = text.split(match.label);
  return <>{before}<Link href={match.href}>{match.label}</Link>{after}</>;
}
