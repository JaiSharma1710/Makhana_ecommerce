import Link from "next/link";
import { Product } from "@/data/store";
import { PackShot } from "@/components/PackShot";
import { WaitlistButton } from "@/components/WaitlistControls";

export function ProductCard({ product }: { product: Product }) {
  const isClassic = product.id === "classic";
  const productHref = isClassic ? "/makhana-classic-roasted" : undefined;
  const art = (
    <>
      <span className={isClassic ? "badge" : "badge dark"}>{isClassic ? "OUT OF STOCK" : "COMING SOON"}</span>
      <PackShot id={product.id} className={isClassic ? "" : "pack-shot-coming-soon"} />
    </>
  );

  return (
    <article className="product-card">
      {productHref ? (
        <Link className="product-art" style={{ background: `linear-gradient(160deg, ${product.tint}22, ${product.tint}0a)` }} href={productHref}>
          {art}
        </Link>
      ) : (
        <div className="product-art" style={{ background: `linear-gradient(160deg, ${product.tint}22, ${product.tint}0a)` }}>
          {art}
        </div>
      )}
      <div className="product-body">
        <div className="status-line">{isClassic ? "Out of stock" : "Coming soon"}</div>
        {productHref ? <Link className="product-title" href={productHref}>{product.name}</Link> : <div className="product-title">{product.name}</div>}
        <p>{product.tag}</p>
        {isClassic ? <div className="pack-price"><b>Rs. {product.price}</b><span>{product.packSize} pack</span></div> : null}
        <WaitlistButton product={product} className={isClassic ? "primary full" : "secondary full"}>
          {isClassic ? "Join the waitlist" : "Notify me"}
        </WaitlistButton>
      </div>
    </article>
  );
}
