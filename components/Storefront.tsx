import Link from "next/link";
import {
  catalog,
  classicNutrition100g,
  classicNutrition25g,
  comboPacks,
  faqData,
  labelRows,
  productFaq,
  Product,
  whyMakhanaFaq
} from "@/data/store";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HeroFlavourShowcase } from "@/components/HeroFlavourShowcase";
import { PackShot } from "@/components/PackShot";
import { ProductCard } from "@/components/ProductCard";
import { ShopFilters } from "@/components/ShopFilters";
import { SiteHeader } from "@/components/SiteHeader";
import { WaitlistButton } from "@/components/WaitlistControls";
import { absoluteUrl } from "@/lib/site";

export function StorefrontShell({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Khao Better",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/assets/kb-logo.png"),
    sameAs: []
  };

  return (
    <div className="site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="shell">
        <TopBar />
        <SiteHeader />
        {children}
        <Footer />
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="topbar">
      <div className="marquee">
        {Array.from({ length: 2 }).map((_, index) => (
          <span key={index}>Pre-launch tasting notes <b>*</b> Classic Roasted launching soon <b>*</b> Join the waitlist for first-batch updates <b>*</b></span>
        ))}
      </div>
    </div>
  );
}

export function HomePageContent() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="pill">0% FRIED · 100% ROASTED</div>
            <h1>Khao Better Makhana for Everyday Crunch</h1>
            <p>Khao Better is a pre-launch roasted makhana brand built for everyday snackers, office desks and student study breaks. Classic Roasted Makhana is the first flavour, with roasted fox nuts in a 25 g pack priced at Rs. 59.</p>
            <div className="hero-actions">
              <WaitlistButton product={catalog[0]} className="primary">Join the waitlist</WaitlistButton>
              <Link className="secondary" href="/why-makhana">Why makhana?</Link>
              <Link className="secondary" href="/our-story">Our story</Link>
            </div>
            <div className="stats"><span><b>25 g</b>classic pack</span><span><b>Rs. 59</b>single pack</span><span><b>Soon</b>launch updates</span></div>
          </div>
          <HeroFlavourShowcase />
        </div>
        <TrustBar />
      </section>
      <WhyMakhanaPreview />
      <ProductRail />
      <HomepageFacts />
      <Steps />
      <Combo />
      <Audience />
      <LongCopy />
      <Faq />
    </main>
  );
}

function TrustBar() {
  const items = [["01", "PRE-LAUNCH", "Classic Roasted first"], ["02", "WAITLIST OPEN", "First-batch updates"], ["03", "NO CHECKOUT YET", "Orders are not open"], ["04", "MORE FLAVOURS", "Coming soon"]];
  return <div className="trust"><div className="container trust-grid">{items.map((item) => <div key={item[1]}><span>{item[0]}</span><strong>{item[1]}</strong><small>{item[2]}</small></div>)}</div></div>;
}

function WhyMakhanaPreview() {
  const cards = [
    ["Roasted, not deep-fried", "Khao Better Classic Roasted is shaped around roasted makhana for a lighter everyday crunch."],
    ["25 g snack pack", "The verified Classic Roasted format is a 25 g pack, sized for desks, bags and study sessions."],
    ["Approx. 113 kcal", "Per-pack calories are derived from the supplied per-100 g nutrition profile and rounded."],
    ["0 g added sugar", "The supplied Classic Roasted nutrition profile lists 0 g added sugar."]
  ];
  return (
    <section className="section">
      <div className="container centered">
        <div className="eyebrow">Why makhana</div>
        <h2>Why Roasted Makhana Fits Everyday Snacking</h2>
        <p>Makhana, also called fox nuts or phool makhana, brings a familiar Indian crunch into a simple roasted snack format.</p>
        <p>For Khao Better, the idea is straightforward: make roasted fox nuts easier to understand before launch, show the Classic Roasted pack facts clearly, and keep the flavour story playful without pretending checkout is open.</p>
        <div className="benefit-grid">
          {cards.map(([title, copy]) => (
            <article className="benefit-card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <div className="hero-actions centered-button"><Link className="secondary" href="/why-makhana">Read the makhana guide</Link></div>
      </div>
    </section>
  );
}

function ProductRail() {
  return <section className="section alt"><div className="container"><div className="section-head"><div><div className="eyebrow">Six flavours</div><h2>Roasted Makhana Flavours</h2></div><Link className="secondary" href="/shop">View all</Link></div><div className="product-grid">{catalog.map((product) => <ProductCard key={product.id} product={product} />)}</div></div></section>;
}

function HomepageFacts() {
  const facts = [["25 g", "Pack size"], ["Rs. 59", "Single pack"], ["113 kcal", "Approx. per pack"], ["2.6 g", "Approx. fibre"], ["0 g", "Added sugar"], ["5.5 g", "Approx. total fat"]];
  return <section className="section"><div className="container"><div className="nutrition"><div><div className="yellow-label">Classic Roasted facts</div><h2>What You're Buying Soon</h2><p>Classic Roasted Makhana is Khao Better's first roasted fox nut pack. It is currently out of stock during pre-launch, with verified pack facts now available before orders open.</p><div className="hero-actions"><Link href="/makhana-classic-roasted">View Classic Roasted details</Link><Link href="/blog/makhana-nutrition-facts">Read makhana nutrition facts</Link></div></div><div className="nutri-grid">{facts.map((item) => <div key={item[1]}><b>{item[0]}</b><strong>{item[1]}</strong><small>{item[1].includes("Approx") ? "Derived from supplied per-100 g profile." : "Verified Classic Roasted detail."}</small></div>)}</div></div></div></section>;
}

function Steps() {
  const steps = [["01", "Recipe development", "Khao Better is preparing roasted makhana flavours for launch."], ["02", "Label confirmation", "Final ingredients, nutrition and pack declarations will be published before orders open."], ["03", "Launch updates", "Waitlist subscribers will be notified when the first batch becomes available."]];
  return <section className="section alt"><div className="container centered"><div className="eyebrow">From idea to pack</div><h2>How Khao Better Is Getting Ready</h2><div className="info-grid">{steps.map((step) => <article key={step[0]}><b>{step[0]}</b><h3>{step[1]}</h3><p>{step[2]}</p></article>)}</div></div></section>;
}

function Combo() {
  return <section className="section"><div className="container"><div className="combo"><div><span>Launching soon</span><h2>Classic Roasted First Batch</h2><p>Classic Roasted is not available for purchase yet. Join the launch list and we'll let you know when the first batch becomes available.</p><div className="combo-price"><b>Out of stock</b><small>Rs. 59 per 25 g pack</small></div><div className="hero-actions"><WaitlistButton product={catalog[0]} className="primary">Join the waitlist</WaitlistButton><Link className="secondary" href="/makhana-classic-roasted">Classic Roasted details</Link></div></div><div className="combo-packs">{[0, 1, 2].map((index) => <PackShot key={index} id="classic" />)}</div></div></div></section>;
}

function Audience() {
  const audiences = [["Office workers", "The Office Snacker", "For the desk drawer moment between lunch and the end of the workday.", "/office-snacks"], ["Students", "Students & Study Sessions", "A compact roasted makhana pack for bags, desks and late study breaks.", "/student-snacks"], ["Everyday snackers", "Everyday Crunch", "For anyone who wants a familiar Indian snack in a simple roasted format.", "/why-makhana"]];
  return <section className="section alt"><div className="container centered"><div className="eyebrow">Who it's for</div><h2>Who Roasted Makhana Is For</h2><div className="info-grid">{audiences.map((audience) => <Link className="info-link-card" href={audience[3]} key={audience[1]}><span className="icon">{audience[0]}</span><h3>{audience[1]}</h3><p>{audience[2]}</p></Link>)}</div></div></section>;
}

function LongCopy() {
  return <section className="section alt"><div className="container long-grid"><div><div className="eyebrow">About the product</div><h2>Roasted Makhana: What You're Buying Soon</h2><p>Khao Better is a pre-launch roasted makhana brand built around the familiar Indian snack also known as fox nuts or phool makhana.</p><p>The first planned flavour is <Link href="/makhana-classic-roasted">Classic Roasted Makhana</Link>. Other flavours are being prepared for later, and final product declarations will be published before orders open.</p><p>For now, the site is collecting launch interest only. It does not offer checkout, payment collection or confirmed delivery timelines. The <Link href="/blog">Khao Better Journal</Link> explains makhana portions, nutrition and snack comparisons while the brand prepares for launch.</p><p>The homepage stays focused on the essentials: what makhana is, how Khao Better describes its roasted snack format, which flavour is first, and where visitors can read more before joining the waitlist. That gives shoppers enough context without turning the launch page into a long article.</p></div><aside className="sticky"><h3>Label declarations</h3>{labelRows.map(([key, value]) => <div className="label-row" key={key}><b>{key}</b><span>{value}</span></div>)}</aside></div></section>;
}

function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };

  return <section className="section"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><div className="container faq-grid"><div><div className="eyebrow">Good questions</div><h2>Roasted Makhana FAQs</h2><p>Launch timing, pack facts and waitlist details for Khao Better.</p></div><FaqAccordion items={faqData} /></div></section>;
}

export function ShopPageContent() {
  return <main className="page-pad"><div className="container"><div className="crumb"><Link href="/">Home</Link> / <b>Shop</b></div><h1 className="page-title">Buy Roasted Makhana Online - All Flavours</h1><p className="page-intro">Explore Khao Better's roasted makhana flavours. Classic Roasted is currently out of stock at Rs. 59 for a 25 g pack, and the remaining flavoured makhana ideas are coming soon.</p><ShopFilters /><div className="combo-strip"><div><h2>Classic Roasted first batch</h2><p>Out of stock today. You can review the verified 25 g pack facts and join the waitlist before orders open.</p></div><div className="hero-actions"><WaitlistButton product={catalog[0]}>Join waitlist</WaitlistButton><Link href="/makhana-classic-roasted">Classic Roasted details</Link><Link href="/why-makhana">Why roasted makhana?</Link></div></div><section className="shop-copy"><div><h2>How to read the Khao Better flavour shelf</h2><p>This shop page is a pre-launch flavour catalogue, not an active checkout. Classic Roasted is the first Khao Better makhana flavour shown with confirmed pack details: a 25 g roasted fox nuts pack priced at Rs. 59 and currently marked out of stock.</p><p>The other flavour ideas, including Peri Peri, Pudina Punch, Achari Chatpata, Tangy Tomato and Cheese & Herb, are marked coming soon. Their cards help visitors understand the planned flavour direction, but final declarations should be checked when those products move closer to launch.</p></div><div><h2>Choosing roasted makhana before launch</h2><p>Makhana is also searched as fox nuts, phool makhana and lotus seeds. Khao Better uses those terms naturally so shoppers can recognise the snack category and compare it with other crunchy options without running into fake availability claims.</p><p>Use the waitlist buttons to express interest, or start with the <Link href="/makhana-classic-roasted">Classic Roasted Makhana details</Link> and the <Link href="/why-makhana">roasted makhana guide</Link> if you want more context before launch.</p></div></section></div></main>;
}

export function ClassicRoastedContent() {
  const product = catalog[0];
  return <main className="page-pad"><div className="container"><div className="crumb"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / <b>{product.name}</b></div><div className="pdp"><div className="pdp-image"><PackShot id={product.id} /></div><div><h1 className="page-title">Classic Roasted Makhana</h1><p className="page-intro">Classic Roasted Makhana is Khao Better's first roasted fox nuts pack for India. Also known as phool makhana, this 25 g roasted makhana snack is priced at Rs. 59 and is currently out of stock while Khao Better prepares for launch.</p><div className="pdp-facts"><span>25 g pack</span><span>Rs. 59</span><span>Out of stock</span></div><div className="soon-box"><b>OUT OF STOCK</b><h2>Join the launch list</h2><p>Join the launch list and we'll let you know when the first batch becomes available. Khao Better is pre-launch, so orders and payments are not open yet.</p><div className="hero-actions"><WaitlistButton product={product} className="primary">Join the waitlist</WaitlistButton><Link className="secondary" href="/why-makhana">Why roasted makhana?</Link></div></div><ProductStatusTable product={product} /></div></div><ProductStory /><NutritionTables /><ComboTable /><ProductFaq /><h2 className="related-title">More flavours coming soon</h2><div className="product-grid related">{catalog.filter((item) => item.id !== product.id).slice(0, 4).map((item) => <ProductCard key={item.id} product={item} />)}</div></div></main>;
}

function ProductStatusTable({ product }: { product: Product }) {
  const rows = [["Availability", product.status === "out-of-stock" ? "Out of stock" : "Coming soon"], ["Ordering", "Not open yet"], ["Single pack price", "Rs. 59"], ["Net quantity", "25 g"], ["Waitlist", "Pre-launch interest only"]];
  return <div className="table-card"><div className="table-head"><span>Product detail</span><span>Status</span></div>{rows.map((row) => <div className="table-row two" key={row[0]}><span>{row[0]}</span><b>{row[1]}</b></div>)}<p>No checkout, payment collection or delivery promise is active on this website.</p></div>;
}

function ProductStory() {
  return <section className="section product-copy"><div><div className="eyebrow">Product notes</div><h2>Plain Roasted Fox Nuts, Built for Daily Snack Moments</h2><p>Classic Roasted Makhana keeps the focus on the simple roasted crunch people expect from fox nuts. It is designed as a straightforward everyday snack, not a loud limited-time offer or a rushed pre-launch purchase push.</p><p>The Khao Better site currently exists to help people discover the product before launch. That is why the page shows verified basics such as the 25 g pack size, Rs. 59 single-pack price, availability status and nutrition profile, while avoiding checkout buttons until the first batch is actually available.</p><p>Makhana is a familiar Indian snack with several common names: roasted makhana, fox nuts, phool makhana and lotus seeds. Khao Better uses those terms naturally so shoppers can recognise the product whether they search by the Indian name or the English snack name.</p></div></section>;
}

function NutritionTables() {
  return <section className="section alt product-copy"><div><div className="eyebrow">Nutrition</div><h2>Classic Roasted Nutrition</h2><p>The 25 g values below are derived from the supplied per-100 g profile and rounded for pack-level readability. For the broader label-reading guide, see <Link href="/blog/makhana-nutrition-facts">Khao Better roasted makhana nutrition facts</Link>.</p><div className="nutrition-tables"><NutritionTable title="Per 25 g pack" rows={classicNutrition25g} /><NutritionTable title="Per 100 g" rows={classicNutrition100g} /></div></div></section>;
}

function NutritionTable({ title, rows }: { title: string; rows: string[][] }) {
  return <div className="table-card nutrition-table"><h3>{title}</h3>{rows.map(([key, value]) => <div className="table-row two" key={key}><span>{key}</span><b>{value}</b></div>)}</div>;
}

function ComboTable() {
  return <section className="section product-copy"><div><div className="eyebrow">Stock up later</div><h2>Planned Pack Options for Launch</h2><p>These Classic Roasted pack options are not available for checkout today. They are shown so shoppers can understand planned pricing before joining the waitlist.</p><div className="combo-table">{comboPacks.map(([name, quantity, price, saving]) => <article key={name}><h3>{name}</h3><strong>{price}</strong><span>{quantity}</span>{saving ? <small>{saving}</small> : <small>Single pack</small>}</article>)}</div></div></section>;
}

function ProductFaq() {
  return <section className="section alt product-copy"><div><div className="faq-grid"><div><div className="eyebrow">Classic questions</div><h2>Classic Roasted Makhana FAQs</h2><p>Pack size, price, nutrition and waitlist details for the first Khao Better flavour.</p></div><FaqAccordion items={productFaq} /></div></div></section>;
}

export function WhyMakhanaContent() {
  const cards = [["Makhana", "The common Indian snack name people use at home and in stores."], ["Fox nuts", "A common English name for the same snack category."], ["Phool makhana", "A familiar Hindi-market term for makhana snack packs."], ["Lotus seeds", "Another shopper-facing term often used around makhana."]];
  return <main><section className="dark-hero"><div className="container"><div className="yellow-label">What is makhana</div><h1>What Is Makhana? A Guide to India's Roasted Fox Nuts</h1><p>Makhana, fox nuts, phool makhana and lotus seeds are names shoppers often use for the same light, crunchy Indian snack category. Khao Better is preparing roasted makhana for everyday snacking without making medical or weight-loss claims.</p></div></section><section className="section"><div className="container"><div className="section-head"><div><div className="eyebrow">Names you may see</div><h2>Makhana, Fox Nuts, Phool Makhana</h2></div><Link className="secondary" href="/shop">Explore Khao Better flavours</Link></div><div className="info-grid">{cards.map((card) => <article key={card[0]}><span className="icon">{card[0]}</span><h3>{card[0]}</h3><p>{card[1]}</p></article>)}</div></div></section><section className="section alt"><div className="container"><div className="nutrition"><div><div className="yellow-label">Classic nutrition overview</div><h2>Reading the 25 g Pack</h2><p>Khao Better Classic Roasted is planned as a 25 g roasted makhana pack. The pack-level nutrition values are derived from the supplied per-100 g profile and rounded.</p><div className="hero-actions"><Link href="/makhana-classic-roasted">See Classic Roasted details</Link><Link href="/blog/makhana-nutrition-facts">Read nutrition facts</Link></div></div><div className="nutri-grid"><div><b>113 kcal</b><strong>Approx. per 25 g</strong><small>Derived and rounded.</small></div><div><b>2.6 g</b><strong>Approx. fibre</strong><small>Per 25 g pack.</small></div><div><b>0 g</b><strong>Added sugar</strong><small>Supplied nutrition profile.</small></div><div><b>Rs. 59</b><strong>25 g pack</strong><small>Out of stock today.</small></div></div></div></div></section><section className="section"><div className="container"><div className="two-col"><div><div className="eyebrow">Roasted vs fried</div><h2>Why Roasting Matters for Khao Better</h2><p>Roasted makhana starts with a different snack idea from deep-fried chips or fried namkeen. Instead of making competitor claims, Khao Better focuses on a clear product description: Classic Roasted is a roasted fox nuts snack, and its page shows the available pack facts directly.</p><p>That makes the snack easy to place into normal moments: work breaks, study sessions, evening cravings and everyday Indian snacking at home.</p></div><div className="table-card"><div className="table-head"><span>Topic</span><span>Khao Better approach</span></div>{[["Cooking style", "Roasted makhana"], ["Pack size", "25 g"], ["Added sugar", "0 g"], ["Current status", "Pre-launch waitlist"]].map((row) => <div className="table-row two" key={row[0]}><span>{row[0]}</span><b>{row[1]}</b></div>)}</div></div><div className="hero-actions centered-button"><Link className="primary" href="/shop">Explore roasted makhana flavours</Link><Link className="secondary" href="/makhana-classic-roasted">Classic Roasted Makhana</Link><Link className="secondary" href="/blog/makhana-vs-popcorn-vs-chips">Compare makhana, popcorn and chips</Link></div></div></section><section className="section alt"><div className="container faq-grid"><div><div className="eyebrow">Makhana basics</div><h2>Roasted Fox Nuts FAQs</h2><p>Simple answers about what makhana is and how Khao Better presents the snack.</p></div><FaqAccordion items={whyMakhanaFaq} /></div></section></main>;
}

export function OurStoryContent() {
  const principles = [["Enjoyable first", "A better snack still has to feel fun to reach for."], ["Roasted clearly", "The product language should make the roasted format easy to understand."], ["Useful for real routines", "Office workers, students and everyday snackers should all recognise their own snack moment."], ["Pre-launch honesty", "The website should say when something is unavailable instead of pretending orders are open."]];
  return <main><section className="story-hero"><div className="container"><div className="eyebrow">Our story</div><h1>We Got Tired of Choosing Between Tasty and Better</h1><p>Khao Better is being built around a simple idea: everyday snacks should feel enjoyable without relying on the same old fried options.</p></div></section><section className="section"><div className="container two-col"><div><div className="eyebrow">The snack moment</div><h2>A Brand Philosophy for Better Everyday Snacks</h2><p>Khao Better is a pre-launch roasted makhana brand for people who want a crunchy Indian snack that fits into ordinary routines: a work desk, a study table, a commute bag or a relaxed evening at home.</p><p>The first product is Classic Roasted Makhana, a 25 g roasted fox nuts pack priced at Rs. 59. It is currently out of stock while the brand prepares for launch, so this site stays focused on discovery and waitlist interest.</p><p>The story here is not a fabricated timeline or a list of milestones. It is the product point of view: keep the snack recognisable, make the roasted makhana format clear, and give people enough information to decide whether they want launch updates.</p><p>That means Khao Better speaks plainly about availability, pack size, price and nutrition details that are available for Classic Roasted. When more flavours are ready, their final product information should be published with the same directness.</p></div><div className="promise-card"><h2>What guides Khao Better</h2>{principles.map((promise) => <div key={promise[0]}><b>*</b><span><strong>{promise[0]}</strong><small>{promise[1]}</small></span></div>)}</div></div></section><section className="section alt"><div className="container"><div className="section-head"><div><div className="eyebrow">Why makhana</div><h2>Built Around a Familiar Indian Crunch</h2></div><Link className="secondary" href="/why-makhana">Understand makhana</Link></div><div className="info-grid"><article><span className="icon">Office</span><h3>For office workers</h3><p>A compact roasted snack idea for desk drawers, afternoon breaks and the moment when a crunchy snack sounds better than another sweet drink. See the guide to <Link href="/office-snacks">healthy office snacks</Link>.</p></article><article><span className="icon">Students</span><h3>For students</h3><p>A simple pack format for study sessions, bag-friendly snacking and late revision blocks where portion clarity helps. See <Link href="/student-snacks">healthy snacks for students</Link>.</p></article><article><span className="icon">Daily</span><h3>For everyday snackers</h3><p>A familiar Indian snack made easy to understand before launch, with flavour cues that feel playful without hiding the basics.</p></article></div><section className="story-copy"><h2>What Khao Better wants to make clear</h2><p>Many snack pages rush visitors toward a cart. Khao Better is taking a slower pre-launch route: show the product, explain makhana as roasted fox nuts, and avoid saying orders are open before they are. That clarity is useful for shoppers and for search engines.</p><p>The brand is also using its early pages to separate confirmed Classic Roasted information from future flavour ideas. Classic has published pack facts today. The other flavours can stay exciting while still being labelled coming soon until their final details are ready.</p><p>This approach keeps the page honest while giving the brand room to grow. Future tasks can add dedicated office, student and location pages, but this story page stays focused on the larger philosophy behind Khao Better.</p></section><div className="hero-actions centered-button"><Link className="primary" href="/shop">See Khao Better roasted makhana flavours</Link><WaitlistButton product={catalog[0]} className="secondary">Join the Classic waitlist</WaitlistButton></div></div></section></main>;
}

function Footer() {
  const exploreLinks = [["/shop", "Shop"], ["/why-makhana", "Why Makhana"], ["/blog", "Blog"], ["/our-story", "Our Story"]];

  return (
    <footer>
      <div className="container footer-main">
        <div className="footer-brand">
          <img src="/assets/kb-logo.png" alt="Khao Better" />
          <p>A better snack for everyday.</p>
          <small>Roasted makhana for everyday snacking.</small>
        </div>
        <nav className="footer-explore" aria-label="Footer navigation">
          <h3>Explore</h3>
          <div className="footer-links">
            {exploreLinks.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
          </div>
        </nav>
        <div className="footer-waitlist">
          <h3>Join the Waitlist</h3>
          <p>We'll let you know when Khao Better is ready.</p>
          <WaitlistButton product={catalog[0]} className="footer-cta">Join the Waitlist</WaitlistButton>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Khao Better</span>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
    </footer>
  );
}
