import Link from "next/link";
import type { ReactNode } from "react";
import { BlogArticle } from "@/data/blog";
import {
  articleUrl,
  blogPosts,
  BlogCategorySlug,
  BlogPost,
  BlogSlug,
  categoryUrl,
  populatedBlogCategories,
  relatedBlogPosts
} from "@/lib/blog-posts";
import { absoluteUrl } from "@/lib/site";

export function BlogHubContent() {
  const featured = blogPosts.find((article) => article.featured) ?? blogPosts[0];
  const categoryAnchorByArticle = new Map<BlogSlug, BlogCategorySlug>();

  populatedBlogCategories.forEach((category) => {
    const firstArticle = blogPosts.find((article) => article.category === category.label);
    if (firstArticle) categoryAnchorByArticle.set(firstArticle.slug, category.slug);
  });

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
          <p>The Khao Better Journal covers makhana, roasted fox nuts, nutrition, everyday snacking, practical comparisons and snack contexts for <Link href="/office-snacks">office workers</Link> and <Link href="/student-snacks">students</Link>. It is built to help you understand the snack before Khao Better launches.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Link className="featured-article" href={articleUrl(featured.slug)} data-reveal>
            <span>{featured.category}</span>
            <h2>{featured.h1}</h2>
            <p>{featured.excerpt}</p>
            <strong>{featured.readTime} - Open guide</strong>
          </Link>
          <div className="blog-chips" aria-label="Blog categories">
            {populatedBlogCategories.map((category) => (
              <Link href={categoryUrl(category.slug)} key={category.slug}>{category.label}</Link>
            ))}
          </div>
          <div className="journal-guide" data-reveal-group>
            <section>
              <h2>Start with the basics</h2>
              <p>If you are new to makhana, begin with the everyday names: makhana, roasted fox nuts, phool makhana and lotus seeds. The <Link href="/why-makhana">Khao Better guide to roasted fox nuts</Link> explains the snack category in plain language before you compare flavours or pack formats.</p>
              <p>The Journal keeps those basics close because snack choices are easier when the product is clear. Khao Better is pre-launch, so the current goal is education, product discovery and waitlist interest rather than checkout.</p>
            </section>
            <section>
              <h2>Choosing a snack</h2>
              <p>Many readers arrive here while comparing makhana with familiar crunchy snacks. The <Link href="/blog/makhana-vs-popcorn-vs-chips">makhana, popcorn and chips comparison</Link> looks at preparation, portion control, desk snacking and label-reading without inventing competitor nutrition numbers.</p>
              <p>That practical lens matters for everyday snacking. A snack can be roasted, fried, plain, buttery, sweet or heavily seasoned, and those details change how it fits into a normal day. The <Link href="/delhi">Delhi NCR evening-snack guide</Link> applies the same thinking to the office-to-commute gap.</p>
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
          <div className="article-grid" data-reveal-group>
            {blogPosts.map((article) => (
              <ArticleCard article={article} anchorId={categoryAnchorByArticle.get(article.slug)} key={article.slug} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function BlogArticleContent({ article }: { article: BlogArticle }) {
  const related = relatedBlogPosts(
    article.slug,
    article.slug === "makhana-vs-lotus-seeds" ||
      article.slug === "how-to-keep-roasted-makhana-crispy" ||
      article.slug === "best-study-snacks-long-study-sessions-india" ||
      article.slug === "best-work-from-home-snacks-india" ||
      article.slug === "why-is-makhana-expensive-india"
      ? 3
      : 2
  );
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
          {article.intro?.map((paragraph) => <p key={paragraph}>{renderLinks(paragraph, article.slug)}</p>)}
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => <p key={paragraph}>{renderLinks(paragraph, article.slug)}</p>)}
              {section.orderedList ? <ol>{section.orderedList.map((item) => <li key={item}>{renderLinks(item, article.slug)}</li>)}</ol> : null}
              {section.list ? <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              {section.afterList?.map((paragraph) => <p key={paragraph}>{renderLinks(paragraph, article.slug)}</p>)}
              {section.callout ? <div className="key-takeaway"><strong>Key takeaway</strong><p>{section.callout}</p></div> : null}
              {section.table ? <ResponsiveTable rows={section.table} /> : null}
              {section.afterTable?.map((paragraph) => <p key={paragraph}>{renderLinks(paragraph, article.slug)}</p>)}
              {section.subsections?.map((subsection) => (
                <div className="article-subsection" key={subsection.heading}>
                  <h3>{subsection.heading}</h3>
                  {subsection.body.map((paragraph) => <p key={paragraph}>{renderLinks(paragraph, article.slug)}</p>)}
                  {subsection.orderedList ? <ol>{subsection.orderedList.map((item) => <li key={item}>{renderLinks(item, article.slug)}</li>)}</ol> : null}
                  {subsection.list ? <ul>{subsection.list.map((item) => <li key={item}>{renderLinks(item, article.slug)}</li>)}</ul> : null}
                  {subsection.afterList?.map((paragraph) => <p key={paragraph}>{renderLinks(paragraph, article.slug)}</p>)}
                </div>
              ))}
            </section>
          ))}
          <section>
            <h2>{article.category === "Comparisons" ? "Comparison FAQs" : article.slug === "makhana-weight-loss" ? "Makhana Weight-Loss FAQs" : article.slug === "best-study-snacks-long-study-sessions-india" ? "Study Snack FAQs" : article.slug === "best-work-from-home-snacks-india" ? "Work-From-Home Snack FAQs" : article.slug === "why-is-makhana-expensive-india" ? "Makhana Pricing FAQs" : article.category === "Everyday Snacking" ? "Roasted Makhana Storage FAQs" : "Makhana Nutrition FAQs"}</h2>
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

function ArticleCard({ article, anchorId }: { article: BlogPost; anchorId?: BlogCategorySlug }) {
  return (
    <Link className="article-card" href={articleUrl(article.slug)} id={anchorId}>
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

function RelatedArticles({ articles }: { articles: readonly BlogPost[] }) {
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
    ["why makhana is expensive in India", "/blog/why-is-makhana-expensive-india"],
    ["2026 Press Information Bureau overview of India's makhana sector", "https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=159603&lang=2&reg=48"],
    ["2026 Government of India sector overview", "https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=159603&lang=2&reg=48"],
    ["Government of India's August 2026 sector overview", "https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=159603&lang=2&reg=48"],
    ["PIB reported", "https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=159603&lang=2&reg=48"],
    ["APEDA's crop calendar", "https://apeda.gov.in/sites/default/files/2025-12/MIC_Monthly_dashboard_Makhana_15122025.pdf"],
    ["APEDA has specifically identified", "https://apeda.gov.in/sites/default/files/study_reports/Makhana_Report_English.pdf"],
    ["ICAR describes traditional makhana popping", "https://icar.gov.in/sites/default/files/2022-06/IR-January-March-2019.pdf"],
    ["ICAR-CIPHET has developed machinery", "https://icar.gov.in/index.php/en/node/9014"],
    ["ICAR documentation on makhana grading", "https://www.icar.gov.in/sites/default/files/2025-10/Farmers%20Innovations_2025___English.pdf"],
    ["work-from-home snacks in India for desk jobs", "/blog/best-work-from-home-snacks-india"],
    ["work-from-home snacks in India", "/blog/best-work-from-home-snacks-india"],
    ["study snacks for long study sessions in India", "/blog/best-study-snacks-long-study-sessions-india"],
    ["healthy snacks for hostel students under ₹100", "/student-snacks"],
    ["how to keep roasted makhana crispy after opening", "/blog/how-to-keep-roasted-makhana-crispy"],
    ["dried-food storage guidance from the National Center for Home Food Preservation", "https://nchfp.uga.edu/how/dry/general-information-drying/packaging-and-storing-dried-foods/"],
    ["Khao Better guide to makhana vs popcorn vs chips", "/blog/makhana-vs-popcorn-vs-chips"],
    ["guide to makhana vs popcorn vs chips", "/blog/makhana-vs-popcorn-vs-chips"],
    ["Khao Better's weight-loss portion guide", "/blog/makhana-weight-loss"],
    ["Khao Better nutrition facts article", "/blog/makhana-nutrition-facts"],
    ["guide to makhana nutrition facts", "/blog/makhana-nutrition-facts"],
    ["makhana nutrition facts", "/blog/makhana-nutrition-facts"],
    ["makhana vs popcorn vs chips", "/blog/makhana-vs-popcorn-vs-chips"],
    ["article on makhana vs lotus seeds", "/blog/makhana-vs-lotus-seeds"],
    ["Why Makhana guide", "/why-makhana"],
    ["guide to what makhana is", "/why-makhana"],
    ["botanical difference between makhana and lotus seeds", "/blog/makhana-vs-lotus-seeds"],
    ["Khao Better Classic Roasted product details", "/makhana-classic-roasted"],
    ["Agricultural and Processed Food Products Export Development Authority, or APEDA", "https://apeda.gov.in/sites/default/files/study_reports/Makhana_Report_English.pdf"],
    ["Kew's Plants of the World Online", "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A605422-1/general-information"],
    ["Makhana is produced from the seeds of Euryale ferox", "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A605350-1/general-information"],
    ["proper sleep", "https://www.cdc.gov/sleep/about/"],
    ["FSSAI's Eat Right India workplace snacking guidance", "https://eatrightindia.gov.in/EatRightCampus/media/pdf/orangeBook_2.pdf"],
    ["office-snacks guide", "/office-snacks"],
    ["best healthy snacks to keep in your office drawer in India", "/office-snacks"],
    ["Khao Better Classic Roasted", "/makhana-classic-roasted"],
    ["Khao Better Classic", "/makhana-classic-roasted"]
  ];
  const content: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining) {
    const match = replacements
      .filter(([, href]) => !href.endsWith(currentSlug))
      .map(([label, href]) => ({ label, href, index: remaining.indexOf(label) }))
      .filter(({ index }) => index >= 0)
      .sort((left, right) => left.index - right.index || right.label.length - left.label.length)[0];

    if (!match) {
      content.push(remaining);
      break;
    }

    if (match.index > 0) content.push(remaining.slice(0, match.index));
    content.push(<Link href={match.href} key={`${match.href}-${key++}`}>{match.label}</Link>);
    remaining = remaining.slice(match.index + match.label.length);
  }

  return content.length === 1 ? content[0] : content;
}
