import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PackShot } from "@/components/PackShot";
import { catalog } from "@/data/store";
import { absoluteUrl } from "@/lib/site";

const flavourStatus = [
  ["Classic Roasted", "Launching first"], ["Peri Peri", "Coming soon"],
  ["Pudina Punch", "Coming soon"], ["Achari Chatpata", "Coming soon"],
  ["Tangy Tomato", "Coming soon"], ["Cheese & Herb", "Coming soon"]
];

const preferences = [
  ["Keep it simple", "Classic Roasted is the starting point for people who want the most straightforward version of the Khao Better range."],
  ["Prefer chilli-led flavours", "Peri Peri is the planned option for shoppers who usually reach for chilli-led snack names."],
  ["Like mint-led flavours", "Pudina Punch brings the mint-led direction into the planned range."],
  ["Prefer achari/chatpata flavours", "Achari Chatpata is the pickle-inspired direction in the lineup."],
  ["Like tomato-led flavours", "Tangy Tomato is the planned tomato-forward option."],
  ["Prefer savoury cheese-and-herb flavours", "Cheese & Herb rounds out the planned range with a cheese-and-herb direction."]
];

const faq = [
  ["How many Khao Better makhana flavours are planned?", "Six: Classic Roasted, Peri Peri, Pudina Punch, Achari Chatpata, Tangy Tomato and Cheese & Herb."],
  ["Which Khao Better flavour launches first?", "Classic Roasted is the first planned launch. The other five flavours are currently coming soon."],
  ["Which makhana flavour is best?", "There is no universally best flavour. The right choice depends on whether you prefer a simpler, chilli-led, mint-led, achari, tomato or cheese-and-herb flavour direction."],
  ["Are all makhana flavours nutritionally the same?", "No. Packaged products can differ in serving size, seasoning, oil and other ingredients, so compare the actual nutrition and ingredient label."],
  ["Can I order all six Khao Better flavours now?", "No. Khao Better is currently pre-launch. Classic Roasted is planned to launch first, while the remaining flavours are still coming soon."]
];

export function FlavoursPageContent() {
  const schemas = [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: "Makhana Flavours: Six Flavours. Zero Boring Energy.", description: "Explore the planned Khao Better roasted makhana flavour lineup.", url: absoluteUrl("/flavours") },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: "Flavours", item: absoluteUrl("/flavours") }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }
  ];

  return <main className="flavours-page">
    {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />)}
    <section className="flavours-hero"><div className="container flavours-hero-grid">
      <div><div className="eyebrow">THE FLAVOUR UNIVERSE</div><h1>Makhana Flavours: Six Flavours. Zero Boring Energy.</h1><p className="flavours-lead">Makhana does not have to mean one plain bowl on repeat.</p><p>Khao Better is building a six-flavour roasted makhana lineup around different snack moods — from the simplicity of Classic Roasted to chilli-led, mint-led, achari, tomato and cheese-and-herb flavour directions.</p><p>Classic Roasted is planned to launch first. The other five flavours are still coming soon.</p><div className="hero-actions"><a className="primary" href="#flavour-lineup">Explore the flavours</a><Link className="secondary" href="/makhana-classic-roasted">See Classic Roasted</Link></div></div>
      <div className="flavours-hero-pack"><PackShot id="classic" priority sizes="(max-width: 760px) 220px, 340px" /><span>Launching first</span></div>
    </div></section>

    <section className="section"><div className="container flavour-narrow" data-reveal><div className="eyebrow">Quick answer</div><h2>What makhana flavours does Khao Better have planned?</h2><div className="table-scroll"><table className="flavour-status-table"><thead><tr><th>Flavour</th><th>Current status</th></tr></thead><tbody>{flavourStatus.map(([name, status]) => <tr key={name}><td>{name}</td><td>{status}</td></tr>)}</tbody></table></div><p className="flavour-note">Only Classic Roasted currently has verified pack, price and nutrition information. The remaining flavours are part of the planned Khao Better range, so their final product details should not be assumed until they are confirmed.</p></div></section>

    <section className="section alt"><div className="container"><div className="section-head" data-reveal><div><div className="eyebrow">Choose your direction</div><h2>How do you choose a makhana flavour?</h2><p>There is no universally “best” makhana flavour. The better question is what kind of snack you usually reach for.</p></div></div><div className="flavour-preference-grid" data-reveal-group>{preferences.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="section" id="flavour-lineup"><div className="container"><div className="section-head" data-reveal><div><div className="eyebrow">The full lineup</div><h2>Meet the Khao Better flavour lineup</h2></div></div><div className="flavour-lineup-grid" data-reveal-group>{catalog.map((product, index) => <article className={index === 0 ? "is-classic" : ""} key={product.id}><span className="flavour-badge">{index === 0 ? "Launching First" : "Coming Soon"}</span><PackShot id={product.id} sizes="(max-width: 560px) 128px, (max-width: 1024px) 24vw, 190px" /><h3>{product.name}</h3><p>{index === 0 ? "The first planned Khao Better launch. Classic Roasted comes in a verified 25 g pack, listed at ₹59, with 0 g added sugar." : "Part of the planned Khao Better flavour lineup."}</p>{index === 0 ? <Link href="/makhana-classic-roasted">See Classic Roasted</Link> : null}</article>)}</div></div></section>

    <section className="section alt"><div className="container flavour-content-grid" data-reveal-group><article><div className="eyebrow">Read the label</div><h2>Are all flavoured makhana products nutritionally the same?</h2><p><strong>No.</strong></p><p>The word “makhana” tells you the base food, but packaged products can differ in serving size, oil, seasoning and other ingredients.</p><p>That means two flavoured makhana products can have different calorie, fat, sodium, sugar and ingredient profiles even when both use makhana as the base.</p><p>For packaged snacks, compare the actual nutrition and ingredient label rather than assuming every flavour or every brand is nutritionally identical. Read the complete <Link href="/blog/makhana-nutrition-facts">makhana nutrition facts</Link> guide.</p></article><article><div className="eyebrow">Compare fairly</div><h2>Is flavoured makhana automatically better than chips or popcorn?</h2><p><strong>Not automatically.</strong></p><p>The name of the snack does not tell you everything about how it was prepared.</p><p>A fair comparison needs to consider serving size, ingredients, oil, seasoning and the actual nutrition label.</p><p>See the practical <Link href="/blog/makhana-vs-popcorn-vs-chips">makhana, popcorn and chips comparison</Link>.</p></article></div></section>

    <section className="section"><div className="container flavour-content-grid" data-reveal-group><article><div className="eyebrow">Snack choice is personal</div><h2>Why is Khao Better building multiple flavours?</h2><p>Because snack choice is personal.</p><p>Some days you want simple. Other days you want something louder.</p><p>Khao Better is being built as a snack brand first: roasted makhana with a little more personality, without turning every packet into a wellness lecture.</p><p>The six-flavour lineup lets the brand move between classic, spicy, mint-led, achari, tomato and savoury directions while keeping makhana at the centre.</p></article><article><div className="eyebrow">First up</div><h2>What launches first?</h2><p>Classic Roasted is the first planned Khao Better flavour.</p><p>Its current verified pack is 25 g and the listed price is ₹59. Khao Better is still pre-launch, so the product is not currently available for checkout.</p><p>The remaining five flavours are planned to follow later.</p><Link className="secondary" href="/makhana-classic-roasted">Explore Classic Roasted</Link></article></div></section>

    <section className="section alt"><div className="container"><div className="section-head" data-reveal><div><div className="eyebrow">Makhana basics</div><h2>Want to understand makhana before choosing a flavour?</h2></div></div><div className="flavour-guide-grid" data-reveal-group><Link href="/why-makhana"><h3>Why makhana?</h3><p>Start with the basics: what makhana is and how it fits into everyday snacking.</p></Link><Link href="/blog/makhana-nutrition-facts"><h3>Makhana nutrition facts</h3><p>Understand calories, serving sizes and why packaged makhana products can differ.</p></Link><Link href="/blog/why-is-makhana-expensive-india"><h3>Why is makhana expensive?</h3><p>See how harvesting, popping, grading and market demand influence makhana prices.</p></Link></div></div></section>

    <section className="section"><div className="container faq-grid"><div data-reveal><div className="eyebrow">Flavour questions</div><h2>Khao Better makhana flavours FAQ</h2><p>Clear answers about the planned six-flavour range and what is available today.</p></div><FaqAccordion items={faq} /></div></section>
  </main>;
}
