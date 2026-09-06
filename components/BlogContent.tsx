import Link from "next/link";
import { articleUrl, blogArticles, BlogArticle, BlogSlug } from "@/data/blog";
import { absoluteUrl } from "@/lib/site";

export function BlogHubContent() {
  const featured = blogArticles[0];

  const hubJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Khao Better Journal",
    url: absoluteUrl("/blog"),
    description: "Khao Better guides on makhana, roasted fox nuts, nutrition, everyday snacking and practical snack comparisons."
  };

  return (
    <main className="blog-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hubJsonLd) }} />
      <section className="blog-hero">
        <div className="container">
          <div className="eyebrow">Khao Better Journal</div>
          <h1>Better Snacking, Explained</h1>
          <p>The Khao Better Journal covers makhana, roasted fox nuts, nutrition, everyday snacking, practical comparisons and snack contexts for office workers and students. It is built to help you understand the snack before Khao Better launches.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Link className="featured-article" href={articleUrl(featured.slug)}>
            <span>{featured.category}</span>
            <h2>{featured.h1}</h2>
            <p>{featured.excerpt}</p>
            <strong>{featured.readTime} - Open guide</strong>
          </Link>
          <div className="blog-chips" aria-label="Blog categories">
            <span>Nutrition</span>
            <span>Comparison</span>
            <span>Everyday Snacking</span>
          </div>
          <div className="journal-guide">
            <section>
              <h2>Start with the basics</h2>
              <p>If you are new to makhana, begin with the everyday names: makhana, roasted fox nuts, phool makhana and lotus seeds. The <Link href="/why-makhana">Khao Better guide to roasted fox nuts</Link> explains the snack category in plain language before you compare flavours or pack formats.</p>
              <p>The Journal keeps those basics close because snack choices are easier when the product is clear. Khao Better is pre-launch, so the current goal is education, product discovery and waitlist interest rather than checkout.</p>
            </section>
            <section>
              <h2>Choosing a snack</h2>
              <p>Many readers arrive here while comparing makhana with familiar crunchy snacks. The <Link href="/blog/makhana-vs-popcorn-vs-chips">makhana, popcorn and chips comparison</Link> looks at preparation, portion control, desk snacking and label-reading without inventing competitor nutrition numbers.</p>
              <p>That practical lens matters for everyday snacking. A snack can be roasted, fried, plain, buttery, sweet or heavily seasoned, and those details change how it fits into a normal day.</p>
            </section>
            <section>
              <h2>Portions and everyday eating</h2>
              <p>For readers thinking about portion size, the <Link href="/blog/makhana-weight-loss">makhana portion guide for weight management</Link> explains how a 25-35 g serving can fit into a broader eating plan. It does not treat makhana as a shortcut or a medical solution.</p>
              <p>For label details, the <Link href="/blog/makhana-nutrition-facts">roasted makhana nutrition facts guide</Link> shows Khao Better Classic calculations for 25 g, 30 g, 50 g and 100 g portions using the supplied product profile.</p>
            </section>
            <section>
              <h2>Khao Better product notes</h2>
              <p>The first Khao Better flavour is <Link href="/makhana-classic-roasted">Classic Roasted Makhana</Link>. It is currently out of stock during pre-launch, with a published 25 g pack format and Rs. 59 single-pack price. Other flavours are coming soon and will need their own final declarations before orders open.</p>
              <p>Use the Journal as the slower reading corner of the site: less like a sales counter, more like a shelf of useful snack notes for people deciding whether roasted makhana belongs in their everyday routine.</p>
            </section>
          </div>
          <div className="article-grid">
            {blogArticles.map((article) => (
              <ArticleCard article={article} key={article.slug} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function BlogArticleContent({ article }: { article: BlogArticle }) {
  const related = blogArticles.filter((item) => item.slug !== article.slug);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.h1,
    description: article.description,
    url: absoluteUrl(articleUrl(article.slug)),
    author: { "@type": "Organization", name: "Khao Better Editorial Team" },
    publisher: {
      "@type": "Organization",
      name: "Khao Better",
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon.png") }
    },
    mainEntityOfPage: absoluteUrl(articleUrl(article.slug))
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: article.h1, item: absoluteUrl(articleUrl(article.slug)) }
    ]
  };

  return (
    <main className="article-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <article>
        <header className="article-hero">
          <div className="container article-container">
            <nav className="crumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / <b>{article.h1}</b>
            </nav>
            <div className="eyebrow">{article.category}</div>
            <h1>{article.h1}</h1>
            <p>{article.description}</p>
            <span>{article.readTime}</span>
          </div>
        </header>
        <div className="container article-container article-body">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => <p key={paragraph}>{renderLinks(paragraph, article.slug)}</p>)}
              {section.callout ? <div className="key-takeaway"><strong>Key takeaway</strong><p>{section.callout}</p></div> : null}
              {section.table ? <ResponsiveTable rows={section.table} /> : null}
            </section>
          ))}
          <section>
            <h2>{article.category === "Comparison" ? "Comparison FAQs" : article.slug === "makhana-weight-loss" ? "Makhana Weight-Loss FAQs" : "Makhana Nutrition FAQs"}</h2>
            <div className="article-faqs">
              {article.faqs.map(([question, answer]) => (
                <div className="faq static-faq" key={question}>
                  <h3>{question}</h3>
                  <p>{answer}</p>
                </div>
              ))}
            </div>
          </section>
          <RelatedArticles articles={related} />
        </div>
      </article>
    </main>
  );
}

function ArticleCard({ article }: { article: BlogArticle }) {
  return (
    <Link className="article-card" href={articleUrl(article.slug)}>
      <span>{article.category}</span>
      <h2>{article.h1}</h2>
      <p>{article.excerpt}</p>
      <strong>{article.readTime} - Open article</strong>
    </Link>
  );
}

function ResponsiveTable({ rows }: { rows: string[][] }) {
  const [head, ...body] = rows;
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>{head.map((cell) => <th key={cell}>{cell}</th>)}</tr>
        </thead>
        <tbody>
          {body.map((row) => <tr key={row.join("-")}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
}

function RelatedArticles({ articles }: { articles: BlogArticle[] }) {
  return (
    <section className="related-articles">
      <h2>Related Khao Better Guides</h2>
      <div className="article-grid compact">
        {articles.map((article) => <ArticleCard article={article} key={article.slug} />)}
      </div>
      <div className="inline-links">
        <Link href="/makhana-classic-roasted">Classic Roasted Makhana product details</Link>
        <Link href="/why-makhana">What is makhana?</Link>
      </div>
    </section>
  );
}

function renderLinks(text: string, currentSlug: BlogSlug) {
  const replacements: Array<[string, string]> = [
    ["Khao Better guide to makhana vs popcorn vs chips", "/blog/makhana-vs-popcorn-vs-chips"],
    ["Khao Better's weight-loss portion guide", "/blog/makhana-weight-loss"],
    ["Khao Better nutrition facts article", "/blog/makhana-nutrition-facts"],
    ["Khao Better Classic Roasted", "/makhana-classic-roasted"],
    ["Khao Better Classic", "/makhana-classic-roasted"]
  ];
  const match = replacements.find(([label, href]) => text.includes(label) && !href.endsWith(currentSlug));

  if (!match) return text;

  const [label, href] = match;
  const [before, after] = text.split(label);
  return <>{before}<Link href={href}>{label}</Link>{after}</>;
}
