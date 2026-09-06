"use client";

import { useState } from "react";
import { catalog } from "@/data/store";
import { ProductCard } from "@/components/ProductCard";

export function ShopFilters() {
  const [filter, setFilter] = useState("");
  const products = filter ? catalog.filter((product) => product.id === filter) : catalog;

  return (
    <div className="shop-layout">
      <aside className="filters">
        <div className="filter-head">
          <h2>Filters</h2>
          <button onClick={() => setFilter("")}>Clear all</button>
        </div>
        <strong>Flavour</strong>
        {catalog.map((product) => (
          <button
            key={product.id}
            className={filter === product.id ? "filter active" : "filter"}
            onClick={() => setFilter(filter === product.id ? "" : product.id)}
          >
            <i style={{ background: product.tint }} />
            {product.name}
          </button>
        ))}
      </aside>
      <div>
        <div className="shop-meta">
          <span>{products.length} flavours</span>
        </div>
        <div className="product-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  );
}
