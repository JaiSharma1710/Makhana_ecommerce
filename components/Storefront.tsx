"use client";

import { useMemo, useState } from "react";
import { catalog, faqData, images, labelRows, mrp, price, Product } from "@/data/store";

type Page = "home" | "shop" | "product" | "why" | "story" | "checkout" | "done";
type CartItem = { key: string; name: string; img: string; price: number; qty: number };

const formatRs = (value: number) => `₹${value}`;

function PackShot({ id, small, sold, className = "" }: { id: string; small?: boolean; sold?: boolean; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${id} makhana pack`}
      className={`pack-shot ${small ? "pack-shot-sm" : ""} ${sold ? "is-muted" : ""} ${className}`}
      style={{ backgroundImage: `url(${images[id]})` }}
    />
  );
}

export default function Storefront() {
  const [page, setPage] = useState<Page>("home");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [pdpId, setPdpId] = useState("classic");
  const [variant, setVariant] = useState("single");
  const [qty, setQty] = useState(1);
  const [filter, setFilter] = useState("");
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [toast, setToast] = useState("");
  const [pay, setPay] = useState("upi");

  const isMobile = device === "mobile";
  const activeProduct = catalog.find((p) => p.id === pdpId) ?? catalog[0];
  const variants = [
    { id: "single", label: "Single pack", sub: "25 g · try it out", price: 49, mrp: 59, save: "17% OFF" },
    { id: "six", label: "Pack of 6", sub: "6 x 25 g · week's supply", price: 269, mrp: 354, save: "Save ₹85" },
    { id: "twelve", label: "Family pack", sub: "12 x 25 g · best value", price: 499, mrp: 708, save: "Save ₹209" }
  ];
  const selectedVariant = variants.find((v) => v.id === variant) ?? variants[0];
  const shopProducts = filter ? catalog.filter((p) => p.id === filter) : catalog;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = applied && subtotal >= 249 ? Math.round(subtotal * 0.08) : 0;
  const shipping = subtotal === 0 || subtotal >= 299 ? 0 : 49;
  const total = subtotal - discount + shipping;
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const freeShipMsg = subtotal === 0 ? "" : subtotal >= 299 ? "Free shipping unlocked ✓" : `Add ₹${299 - subtotal} more for free shipping`;

  const flash = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1900);
  };

  const nav = (next: Page) => {
    setPage(next);
    setMenuOpen(false);
    setCartOpen(false);
    window.scrollTo(0, 0);
  };

  const openProduct = (product: Product) => {
    setPdpId(product.id);
    setVariant("single");
    setQty(1);
    nav("product");
  };

  const addLine = (line: CartItem) => {
    setCart((items) => {
      const found = items.find((item) => item.key === line.key);
      if (found) return items.map((item) => (item.key === line.key ? { ...item, qty: item.qty + line.qty } : item));
      return [...items, line];
    });
    flash(`${line.name} added to cart`);
  };

  const addProduct = (product: Product) => {
    if (product.sold) {
      flash(`We'll email you when ${product.name} launches`);
      return;
    }
    addLine({ key: product.id, name: `${product.name} · 25 g`, img: images[product.id], price, qty: 1 });
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "KHAOBETTER8" && subtotal >= 249) {
      setApplied(true);
      flash("Coupon applied - 8% off");
    } else {
      flash(subtotal < 249 ? "Coupon needs a ₹249 cart" : "That code did not work");
    }
  };

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Khao Better",
      url: "https://khaobetter.in/",
      logo: "https://khaobetter.in/assets/kb-logo.png",
      sameAs: []
    }),
    []
  );

  return (
    <div className="site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DeviceToggle device={device} setDevice={setDevice} />
      {toast ? <div className="toast">{toast}</div> : null}
      <div className={`shell ${isMobile ? "mobile-shell" : ""}`}>
        <TopBar />
        <Header
          isMobile={isMobile}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          nav={nav}
          cartCount={cartCount}
          openCart={() => setCartOpen(true)}
        />
        {page === "home" && <HomePage nav={nav} openProduct={openProduct} addProduct={addProduct} addCombo={() => addLine({ key: "pack6", name: "Classic Roasted · Pack of 6", img: images.classic, price: 269, qty: 1 })} openFaq={openFaq} setOpenFaq={setOpenFaq} isMobile={isMobile} />}
        {page === "shop" && <ShopPage products={shopProducts} filter={filter} setFilter={setFilter} nav={nav} openProduct={openProduct} addProduct={addProduct} addCombo={() => addLine({ key: "pack6", name: "Classic Roasted · Pack of 6", img: images.classic, price: 269, qty: 1 })} />}
        {page === "product" && <ProductPage product={activeProduct} variants={variants} variant={variant} setVariant={setVariant} qty={qty} setQty={setQty} nav={nav} openProduct={openProduct} addProduct={addProduct} addPdp={() => addLine({ key: `${activeProduct.id}-${variant}`, name: `${activeProduct.name} · ${selectedVariant.label}`, img: images[activeProduct.id], price: selectedVariant.price, qty })} selectedVariant={selectedVariant} />}
        {page === "why" && <WhyPage nav={nav} />}
        {page === "story" && <StoryPage />}
        {page === "checkout" && <CheckoutPage cart={cart} subtotal={subtotal} discount={discount} shipping={shipping} total={total} pay={pay} setPay={setPay} placeOrder={() => { setCart([]); setApplied(false); setCoupon(""); nav("done"); }} />}
        {page === "done" && <DonePage nav={nav} />}
        <Footer />
        {cartOpen ? (
          <CartDrawer
            cart={cart}
            setCart={setCart}
            close={() => setCartOpen(false)}
            nav={nav}
            subtotal={subtotal}
            discount={discount}
            shipping={shipping}
            total={total}
            cartCount={cartCount}
            freeShipMsg={freeShipMsg}
            coupon={coupon}
            setCoupon={setCoupon}
            applyCoupon={applyCoupon}
          />
        ) : null}
      </div>
    </div>
  );
}

function DeviceToggle({ device, setDevice }: { device: string; setDevice: (d: "desktop" | "mobile") => void }) {
  return (
    <div className="device-toggle">
      <button className={device === "desktop" ? "active" : ""} onClick={() => setDevice("desktop")}>Desktop</button>
      <button className={device === "mobile" ? "active" : ""} onClick={() => setDevice("mobile")}>Mobile</button>
    </div>
  );
}

function TopBar() {
  return (
    <div className="topbar">
      <div className="marquee">
        {Array.from({ length: 2 }).map((_, i) => (
          <span key={i}>Roasted, never fried <b>✦</b> Flat 8% off above ₹249 - code KHAOBETTER8 <b>✦</b> Free shipping over ₹299 <b>✦</b></span>
        ))}
      </div>
    </div>
  );
}

function Header({ isMobile, menuOpen, setMenuOpen, nav, cartCount, openCart }: { isMobile: boolean; menuOpen: boolean; setMenuOpen: (v: boolean) => void; nav: (p: Page) => void; cartCount: number; openCart: () => void }) {
  return (
    <header className="header">
      <div className="container nav-row">
        {isMobile ? <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"><span /><span /><span /></button> : null}
        <button className="logo-link" onClick={() => nav("home")}><img src="/assets/kb-logo.png" alt="Khao Better" /></button>
        {!isMobile ? (
          <>
            <nav className="nav">
              <button onClick={() => nav("shop")}>Shop All</button>
              <button onClick={() => nav("shop")}>Combos</button>
              <button onClick={() => nav("why")}>Why Makhana</button>
              <button onClick={() => nav("story")}>Our Story</button>
            </nav>
            <div className="search">⌕ <span>Search flavours, combos...</span></div>
            <button className="mini-action">Account</button>
          </>
        ) : null}
        <button className="cart-button" onClick={openCart}>Cart <span>{cartCount}</span></button>
      </div>
      {menuOpen ? (
        <nav className="mobile-menu">
          <button onClick={() => nav("shop")}>Shop All</button>
          <button onClick={() => nav("why")}>Why Makhana</button>
          <button onClick={() => nav("story")}>Our Story</button>
        </nav>
      ) : null}
    </header>
  );
}

function ProductCard({ product, openProduct, addProduct }: { product: Product; openProduct: (p: Product) => void; addProduct: (p: Product) => void }) {
  return (
    <article className="product-card">
      <button className="product-art" style={{ background: `linear-gradient(160deg, ${product.tint}22, ${product.tint}0a)` }} onClick={() => openProduct(product)}>
        {product.sold ? <span className="badge dark">COMING SOON</span> : product.badge ? <span className="badge">{product.badge}</span> : null}
        <PackShot id={product.id} sold={product.sold} />
      </button>
      <div className="product-body">
        {!product.sold ? <div className="rating">★ {product.rating} <span>({product.reviews})</span></div> : null}
        <button className="product-title" onClick={() => openProduct(product)}>{product.name}</button>
        <p>{product.tag}</p>
        {product.sold ? (
          <>
            <div className="soon">Coming soon</div>
            <button className="secondary full" onClick={() => openProduct(product)}>Notify me</button>
          </>
        ) : (
          <>
            <div className="price-row"><strong>{formatRs(price)}</strong><s>{formatRs(mrp)}</s><em>17% OFF</em></div>
            <button className="primary full" onClick={() => addProduct(product)}>Add to cart</button>
          </>
        )}
      </div>
    </article>
  );
}

function HomePage({ nav, openProduct, addProduct, addCombo, openFaq, setOpenFaq, isMobile }: { nav: (p: Page) => void; openProduct: (p: Product) => void; addProduct: (p: Product) => void; addCombo: () => void; openFaq: number; setOpenFaq: (n: number) => void; isMobile: boolean }) {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="pill">0% fried · 100% roasted</div>
            <h1>Roasted Makhana. Never Fried.</h1>
            <p>Khao Better roasted makhana is puffed lotus seed - fox nuts - dry-roasted in small batches in Bihar and tossed in real ground spices. Every 25 g pack carries <strong>113 kcal, 2.6 g dietary fibre, no added sugar and 0 g trans fat</strong>.</p>
            <div className="hero-actions">
              <button className="primary" onClick={() => nav("shop")}>Shop all flavours →</button>
              <button className="secondary" onClick={() => nav("why")}>Why makhana?</button>
            </div>
            <div className="stats"><span><b>113 kcal</b>per 25 g pack</span><span><b>2.6 g</b>dietary fibre</span><span><b>0 g</b>added sugar</span></div>
          </div>
          <div className="fan" aria-label="Khao Better makhana packs">
            {catalog.map((p, i) => <PackShot key={p.id} id={p.id} className={`fan-pack fan-${i}`} />)}
          </div>
        </div>
        <TrustBar />
      </section>
      <Comparison />
      <ProductRail nav={nav} openProduct={openProduct} addProduct={addProduct} />
      <Nutrition nav={nav} />
      <Steps />
      <Combo addCombo={addCombo} />
      <Audience />
      <LongCopy isMobile={isMobile} />
      <Faq openFaq={openFaq} setOpenFaq={setOpenFaq} />
    </main>
  );
}

function TrustBar() {
  const items = [["⇢", "FREE SHIPPING", "On orders above ₹299"], ["✓", "SECURE PAYMENTS", "100% safe checkout"], ["↺", "EASY RETURNS", "7-day return policy"], ["⚡", "SAME DAY DISPATCH", "On orders before 2 PM"]];
  return <div className="trust"><div className="container trust-grid">{items.map((i) => <div key={i[1]}><span>{i[0]}</span><strong>{i[1]}</strong><small>{i[2]}</small></div>)}</div></div>;
}

function Comparison() {
  const rows = [["Calories", "113 kcal", "134 kcal"], ["Total fat", "5.5 g", "8.4 g"], ["Dietary fibre", "2.6 g", "1.0 g"], ["Added sugar", "0 g", "0.5 g"]];
  return (
    <section className="section">
      <div className="container centered">
        <div className="eyebrow">The roasted difference</div>
        <h2>Roasted Makhana vs Fried Snacks: The 25 g Comparison</h2>
        <p>Roasted makhana against the packet most of us reach for at 5 pm, measured on the same 25 g serving.</p>
        <div className="compare">
          <div className="compare-card good"><h3>Khao Better Makhana</h3>{rows.map((r) => <Metric key={r[0]} label={r[0]} value={r[1]} good />)}</div>
          <div className="compare-card"><h3>Fried potato chips</h3>{rows.map((r) => <Metric key={r[0]} label={r[0]} value={r[2]} />)}</div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, good }: { label: string; value: string; good?: boolean }) {
  const widths: Record<string, number> = { Calories: good ? 63 : 78, "Total fat": good ? 46 : 74, "Dietary fibre": good ? 80 : 30, "Added sugar": good ? 2 : 16 };
  return <div className="metric"><div><span>{label}</span><b>{value}</b></div><i><em style={{ width: `${widths[label]}%` }} /></i></div>;
}

function ProductRail({ nav, openProduct, addProduct }: { nav: (p: Page) => void; openProduct: (p: Product) => void; addProduct: (p: Product) => void }) {
  return <section className="section alt"><div className="container"><div className="section-head"><div><div className="eyebrow">Six flavours · Classic in stock</div><h2>Buy Roasted Makhana Online - Six Flavours</h2></div><button className="secondary" onClick={() => nav("shop")}>View all →</button></div><div className="product-grid">{catalog.map((p) => <ProductCard key={p.id} product={p} openProduct={openProduct} addProduct={addProduct} />)}</div></div></section>;
}

function Nutrition({ nav }: { nav: (p: Page) => void }) {
  const nutrients = [["113", "Calories", "Per 25 g pack - 450 per 100 g"], ["2.6g", "Dietary fibre", "10.3 g per 100 g"], ["0g", "Added sugar", "And no cholesterol at all"], ["0g", "Trans fat", "Because nothing is fried"]];
  return <section className="section"><div className="container"><div className="nutrition"><div><div className="yellow-label">One 25 g pack</div><h2>Roasted Makhana Nutrition, Per 25 g Pack</h2><p>Three ingredients on the back of the pack: makhana, cold-pressed oil and ground spices.</p><button onClick={() => nav("why")}>See the full breakdown</button></div><div className="nutri-grid">{nutrients.map((n) => <div key={n[1]}><b>{n[0]}</b><strong>{n[1]}</strong><small>{n[2]}</small></div>)}</div></div></div></section>;
}

function Steps() {
  const steps = [["01", "Harvested by hand", "Foxnuts are pulled from pond beds across Darbhanga and Madhubani by farmer families we buy from directly."], ["02", "Popped, then graded", "Only the 5+ suta grade - the big, white, uniform pops - makes it into our pouches."], ["03", "Roasted in small batches", "Dry-roasted at 140°C, tossed with spices, nitrogen-flushed and sealed the same day."]];
  return <section className="section alt"><div className="container centered"><div className="eyebrow">From pond to pack</div><h2>How Our Bihar Makhana Is Grown and Roasted</h2><div className="info-grid">{steps.map((s) => <article key={s[0]}><b>{s[0]}</b><h3>{s[1]}</h3><p>{s[2]}</p></article>)}</div></div></section>;
}

function Combo({ addCombo }: { addCombo: () => void }) {
  return <section className="section"><div className="container"><div className="combo"><div><span>Save ₹85</span><h2>Roasted Makhana Pack of 6 - Save ₹85</h2><p>Six packs of Classic Roasted - a week of 5 pm sorted, at ₹45 a pack instead of ₹59.</p><div className="combo-price"><b>₹269</b><small><s>₹354</s>6 x 25 g packs</small></div><button className="primary" onClick={addCombo}>Add 6-pack to cart</button></div><div className="combo-packs">{[0, 1, 2].map((i) => <PackShot key={i} id="classic" />)}</div></div></div></section>;
}

function Audience() {
  const audiences = [["💻", "The 5 pm desk snacker", "A 25 g pack is 113 kcal, opens with one hand and holds its crunch in a desk drawer for months.", "Pack of 6 · ₹269"], ["🎒", "Parents packing tiffins", "Three ingredients on the back of the pack, nothing hydrogenated, no added sugar and no artificial colour.", "Family pack · 12 x 25 g · ₹499"], ["🏋", "Anyone reading the label", "The numbers are on every product page per 25 g and per 100 g. No claims beyond what the label says.", "Classic Roasted · 25 g · ₹49"]];
  return <section className="section alt"><div className="container centered"><div className="eyebrow">Who it's for</div><h2>Who Roasted Makhana Is For</h2><div className="info-grid">{audiences.map((a) => <article key={a[1]}><span className="icon">{a[0]}</span><h3>{a[1]}</h3><p>{a[2]}</p><strong>{a[3]}</strong></article>)}</div></div></section>;
}

function LongCopy({ isMobile }: { isMobile: boolean }) {
  return <section className="section alt"><div className="container long-grid"><div><div className="eyebrow">About the product</div><h2>Roasted Makhana: What You're Buying</h2><p>Khao Better roasted makhana starts as the seed of <em>Euryale ferox</em>, a water lily farmed in the shallow ponds of north Bihar. The seed is harvested by hand, sun-dried, and popped with dry heat until it puffs into a light white kernel.</p><p>Graded seed goes into a rotary drum and is dry-roasted at around 140°C until it turns brittle enough to shatter between your teeth. It is then tumbled with cold-pressed sunflower oil and ground spices before being nitrogen-flushed and sealed.</p><p>A 25 g pack carries 113 kcal, 2.6 g dietary fibre, no added sugar and 0 g trans fat. We publish both per-pack and per-100 g figures because comparison should be easy.</p></div><aside className={isMobile ? "" : "sticky"}><h3>Label declarations</h3>{labelRows.map(([k, v]) => <div className="label-row" key={k}><b>{k}</b><span>{v}</span></div>)}</aside></div></section>;
}

function Faq({ openFaq, setOpenFaq }: { openFaq: number; setOpenFaq: (n: number) => void }) {
  return <section className="section"><div className="container faq-grid"><div><div className="eyebrow">Good questions</div><h2>Roasted Makhana FAQs</h2><p>Roasting, storage, shipping, sourcing and label declarations - the things people ask before their first order.</p></div><div>{faqData.map(([q, a], i) => <article className="faq" key={q}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>{q}<span>{openFaq === i ? "−" : "+"}</span></button>{openFaq === i ? <p>{a}</p> : null}</article>)}</div></div></section>;
}

function ShopPage({ products, filter, setFilter, nav, openProduct, addProduct, addCombo }: { products: Product[]; filter: string; setFilter: (f: string) => void; nav: (p: Page) => void; openProduct: (p: Product) => void; addProduct: (p: Product) => void; addCombo: () => void }) {
  return <main className="page-pad"><div className="container"><div className="crumb"><button onClick={() => nav("home")}>Home</button> / <b>Shop All</b></div><h1 className="page-title">Buy Roasted Makhana Online - All Flavours</h1><p className="page-intro">Dry-roasted Bihar fox nuts in 25 g single-serve packs. Classic Roasted ships today at ₹49; the other five flavours are in final roast trials.</p><div className="shop-layout"><aside className="filters"><div className="filter-head"><h3>Filters</h3><button onClick={() => setFilter("")}>Clear all</button></div><strong>Flavour</strong>{catalog.map((p) => <button key={p.id} className={filter === p.id ? "filter active" : "filter"} onClick={() => setFilter(filter === p.id ? "" : p.id)}><i style={{ background: p.tint }} />{p.name}</button>)}</aside><div><div className="shop-meta"><span>{products.length} products</span><b>Sort: Featured ▾</b></div><div className="product-grid">{products.map((p) => <ProductCard key={p.id} product={p} openProduct={openProduct} addProduct={addProduct} />)}</div><div className="combo-strip"><div><h3>Classic Roasted · Pack of 6</h3><p>6 x 25 g · saves ₹85 · in stock today</p></div><b>₹269</b><button onClick={addCombo}>Add 6-pack</button></div></div></div></div></main>;
}

function ProductPage({ product, variants, variant, setVariant, qty, setQty, nav, openProduct, addProduct, addPdp, selectedVariant }: { product: Product; variants: { id: string; label: string; sub: string; price: number; mrp: number; save: string }[]; variant: string; setVariant: (v: string) => void; qty: number; setQty: (q: number) => void; nav: (p: Page) => void; openProduct: (p: Product) => void; addProduct: (p: Product) => void; addPdp: () => void; selectedVariant: { label: string; price: number; mrp: number; save: string } }) {
  return <main className="page-pad"><div className="container"><div className="crumb"><button onClick={() => nav("home")}>Home</button> / <button onClick={() => nav("shop")}>Shop All</button> / <b>{product.name}</b></div><div className="pdp"><div className="pdp-image"><PackShot id={product.id} sold={product.sold} /></div><div><h1 className="page-title">{/roasted/i.test(product.name) ? product.name : `${product.name} Roasted`} Makhana · 25 g</h1><p className="page-intro">{product.desc}</p>{product.sold ? <div className="soon-box"><b>COMING SOON</b><h2>This flavour is on its way</h2><p>Leave your email and you'll be first to know when it launches - or start with Classic Roasted, in stock today.</p><button className="secondary" onClick={() => nav("shop")}>Browse Classic</button></div> : <><div className="pdp-price"><b>₹{selectedVariant.price}</b><s>₹{selectedVariant.mrp}</s><em>{selectedVariant.save}</em></div><div className="variant-list">{variants.map((v) => <button className={variant === v.id ? "variant active" : "variant"} key={v.id} onClick={() => setVariant(v.id)}><span><b>{v.label}</b><small>{v.sub}</small></span><span><b>₹{v.price}</b><small>{v.save}</small></span></button>)}</div><div className="buy-row"><div className="qty"><button onClick={() => setQty(Math.max(1, qty - 1))}>−</button><b>{qty}</b><button onClick={() => setQty(qty + 1)}>+</button></div><button className="primary" onClick={addPdp}>Add to cart · ₹{selectedVariant.price * qty}</button></div></>}<NutriTable sold={product.sold} /></div></div><h2 className="related-title">You might also like</h2><div className="product-grid related">{catalog.filter((p) => p.id !== product.id).slice(0, 4).map((p) => <ProductCard key={p.id} product={p} openProduct={openProduct} addProduct={addProduct} />)}</div></div></main>;
}

function NutriTable({ sold }: { sold: boolean }) {
  const rows = [["Energy", "113 kcal", "450 kcal"], ["Protein", "1.5 g", "6.1 g"], ["Carbohydrate", "13.0 g", "52.1 g"], ["Dietary fibre", "2.6 g", "10.3 g"], ["Added sugar", "0 g", "0 g"], ["Total fat", "5.5 g", "21.8 g"], ["Trans fat", "0 g", "0 g"], ["Sodium", "117 mg", "469 mg"]];
  return <div className="table-card"><div className="table-head"><span>Nutritional info</span><span>Per 25 g</span><span>Per 100 g</span></div>{rows.map((r) => <div className="table-row" key={r[0]}><span>{r[0]}</span><b>{r[1]}</b><b>{r[2]}</b></div>)}<p>{sold ? "Indicative values, based on laboratory analysis of Classic Roasted." : "Approximate values from laboratory analysis of Classic Roasted."}</p></div>;
}

function WhyPage({ nav }: { nav: (p: Page) => void }) {
  const cards = [["⚖", "A light 113 kcal serve", "One 25 g pack is 113 kcal, so it fits between meals without becoming one."], ["🌾", "10.3 g fibre per 100 g", "Almost all of it from the seed itself - no isolates or fibre blend hiding in the ingredient list."], ["♡", "No added sugar, no cholesterol", "0 g added sugar and 0 mg cholesterol on the label."], ["⊘", "Zero trans fat", "We never fry. The oil is cold-pressed and never hydrogenated."]];
  return <main><section className="dark-hero"><div className="container"><div className="yellow-label">Why makhana</div><h1>Why Roasted Makhana Is Worth Snacking On</h1><p>Makhana - fox nut, lotus seed, phool makhana - has been eaten in India for centuries. What follows is what the label actually says about it.</p></div></section><section className="section"><div className="container"><div className="info-grid">{cards.map((c) => <article key={c[1]}><span className="icon">{c[0]}</span><h3>{c[1]}</h3><p>{c[2]}</p></article>)}</div><div className="compare-table"><b>Per 25 g</b><b>Makhana</b><b>Potato chips</b><b>Namkeen</b>{[["Calories", "113 kcal", "134 kcal", "145 kcal"], ["Total fat", "5.5 g", "8.4 g", "9.6 g"], ["Dietary fibre", "2.6 g", "1.0 g", "1.1 g"], ["Cooking method", "Dry-roasted", "Deep-fried", "Deep-fried"]].flatMap((r) => r.map((c, i) => <span key={`${r[0]}-${i}`}>{c}</span>))}</div><button className="primary centered-button" onClick={() => nav("shop")}>Start snacking better →</button></div></section></main>;
}

function StoryPage() {
  const promises = [["Roasted, always", "If we ever fry anything, we will say so on the front of the pack."], ["Three-line ingredient list", "Makhana, cold-pressed oil, spices. No maltodextrin, no anti-caking agents."], ["Direct from farmers", "We buy from 240 farming families in Bihar at a fixed floor price."], ["Honest pack weights", "25 g of makhana is a lot of volume. We fill the pack, not the nitrogen."]];
  return <main><section className="story-hero"><div className="container"><div className="eyebrow">Our story</div><h1>We got tired of choosing between tasty and better.</h1><p>Khao Better started in 2023 with a simple frustration: every better snack tasted like cardboard, and everything tasty came deep-fried.</p></div></section><section className="section"><div className="container two-col"><div className="promise-card"><h2>What we promise</h2>{promises.map((p) => <div key={p[0]}><b>✓</b><span><strong>{p[0]}</strong><small>{p[1]}</small></span></div>)}</div><div className="numbers"><h2>By the numbers</h2><div><span><b>240</b>farming families</span><span><b>2023</b>year we started</span><span><b>6</b>flavours</span><span><b>1.4 M</b>packs crunched</span></div></div></div></section></main>;
}

function CheckoutPage({ cart, subtotal, discount, shipping, total, pay, setPay, placeOrder }: { cart: CartItem[]; subtotal: number; discount: number; shipping: number; total: number; pay: string; setPay: (p: string) => void; placeOrder: () => void }) {
  const methods = [["upi", "UPI / GPay / PhonePe", "Instant"], ["card", "Credit or debit card", "Visa, Mastercard, RuPay"], ["netb", "Netbanking", "All major banks"], ["cod", "Cash on delivery", "₹20 handling fee"]];
  return <main className="page-pad"><div className="container"><h1 className="page-title">Checkout</h1><p className="page-intro">Secure payment · Free returns within 7 days</p><div className="checkout"><div><section className="form-card"><h2>1 · Delivery address</h2><div className="form-grid"><input placeholder="First name" /><input placeholder="Last name" /><input placeholder="Phone number" /><input placeholder="Email" /></div><input placeholder="Flat, street, area" /><div className="form-grid three"><input placeholder="Pincode" /><input placeholder="City" /><input placeholder="State" /></div></section><section className="form-card"><h2>2 · Payment</h2>{methods.map((m) => <button key={m[0]} className={pay === m[0] ? "pay active" : "pay"} onClick={() => setPay(m[0])}><span>{m[1]}</span><small>{m[2]}</small></button>)}</section><button className="primary place" onClick={placeOrder}>Place order · ₹{total}</button></div><OrderSummary cart={cart} subtotal={subtotal} discount={discount} shipping={shipping} total={total} /></div></div></main>;
}

function OrderSummary({ cart, subtotal, discount, shipping, total }: { cart: CartItem[]; subtotal: number; discount: number; shipping: number; total: number }) {
  return <aside className="summary"><h2>Order summary</h2>{cart.map((c) => <div className="summary-line" key={c.key}><img src={c.img} alt="" /><span><b>{c.name}</b><small>Qty {c.qty}</small></span><strong>₹{c.price * c.qty}</strong></div>)}<div className="totals"><span>Subtotal <b>₹{subtotal}</b></span><span>Discount <b>-₹{discount}</b></span><span>Shipping <b>{subtotal === 0 ? "-" : shipping === 0 ? "FREE" : "₹49"}</b></span><strong>Total <b>₹{total}</b></strong></div></aside>;
}

function DonePage({ nav }: { nav: (p: Page) => void }) {
  return <main className="done"><div><b>✓</b><h1>Order placed. Crunch incoming.</h1><p>Order <strong>#KB-48219</strong> ships today if you ordered before 2 PM. We'll text you a tracking link.</p><button className="primary" onClick={() => nav("home")}>Back to shopping</button></div></main>;
}

function Footer() {
  const cols = [["Shop", "All flavours", "Combos & boxes", "Family packs", "Corporate gifting"], ["Learn", "Why makhana", "Our story", "Nutrition", "Blog"], ["Help", "Track your order", "Shipping & returns", "FAQs", "Contact us"]];
  return <footer><div className="container footer-grid"><div><img src="/assets/kb-logo.png" alt="Khao Better" /><p>A better snack for everyday. Roasted makhana from Bihar, made for people who read the back of the pack.</p></div>{cols.map((col) => <div key={col[0]}><h3>{col[0]}</h3>{col.slice(1).map((i) => <a href="#" key={i}>{i}</a>)}</div>)}<div><h3>Get ₹50 off</h3><p>Join the list. One email a month, no nonsense.</p><div className="subscribe"><input placeholder="you@email.com" /><button>Join</button></div></div></div><div className="container footer-bottom"><span>© 2026 Khao Better Foods Pvt. Ltd. · FSSAI 10023456789012</span><span>Privacy · Terms · Shipping · Returns</span></div></footer>;
}

function CartDrawer({ cart, setCart, close, nav, subtotal, discount, shipping, total, cartCount, freeShipMsg, coupon, setCoupon, applyCoupon }: { cart: CartItem[]; setCart: React.Dispatch<React.SetStateAction<CartItem[]>>; close: () => void; nav: (p: Page) => void; subtotal: number; discount: number; shipping: number; total: number; cartCount: number; freeShipMsg: string; coupon: string; setCoupon: (v: string) => void; applyCoupon: () => void }) {
  return <><div className="overlay" onClick={close} /><aside className="drawer"><div className="drawer-head"><h2>Your cart ({cartCount})</h2><button onClick={close}>×</button></div>{freeShipMsg ? <div className="free-msg">{freeShipMsg}</div> : null}<div className="drawer-items">{cart.length === 0 ? <div className="empty"><p>Nothing crunchy in here yet.</p><button className="primary" onClick={() => nav("shop")}>Browse flavours</button></div> : cart.map((c) => <div className="cart-line" key={c.key}><img src={c.img} alt="" /><span><b>{c.name}</b><small>₹{c.price} each</small><em><button onClick={() => setCart((items) => items.map((i) => i.key === c.key ? { ...i, qty: Math.max(1, i.qty - 1) } : i))}>−</button>{c.qty}<button onClick={() => setCart((items) => items.map((i) => i.key === c.key ? { ...i, qty: i.qty + 1 } : i))}>+</button><button onClick={() => setCart((items) => items.filter((i) => i.key !== c.key))}>Remove</button></em></span><strong>₹{c.price * c.qty}</strong></div>)}</div><div className="drawer-total"><div className="coupon"><input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" /><button onClick={applyCoupon}>Apply</button></div><span>Subtotal <b>₹{subtotal}</b></span><span>Discount <b>-₹{discount}</b></span><span>Shipping <b>{subtotal === 0 ? "-" : shipping === 0 ? "FREE" : "₹49"}</b></span><strong>Total <b>₹{total}</b></strong><button className="primary full" onClick={() => nav("checkout")}>Checkout →</button></div></aside></>;
}
