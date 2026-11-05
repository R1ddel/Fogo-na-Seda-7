"use client";

import Link from "next/link";
import { formatBRL, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ProductPhoto } from "./ProductPhoto";

type Variant = "highlight" | "grid" | "menu" | "perfume";

export function ProductCard({
  product,
  variant = "grid",
}: {
  product: Product;
  variant?: Variant;
}) {
  const { addItem } = useCart();

  if (variant === "highlight" || variant === "menu") {
    return (
      <article className="group relative flex flex-col overflow-hidden rounded-[var(--radius)] border border-border-soft bg-surface transition-transform duration-300 hover:-translate-y-0.5">
        <Link href={`/produto/${product.id}`} className="relative block aspect-[4/3]">
          <ProductPhoto product={product} className="h-full w-full" />
          <button
            type="button"
            aria-label="Favoritar"
            className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white/70 backdrop-blur-sm transition hover:text-gold"
            onClick={(e) => e.preventDefault()}
          >
            <HeartIcon />
          </button>
        </Link>
        <div className="flex flex-1 items-end justify-between gap-2 p-3">
          <div className="min-w-0">
            <Link
              href={`/produto/${product.id}`}
              className="block truncate text-sm font-semibold text-ink hover:text-gold"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 font-bold text-gold">{formatBRL(product.price)}</p>
          </div>
          <button
            type="button"
            aria-label={`Adicionar ${product.name}`}
            onClick={() => addItem(product.id, 1)}
            className="btn-gold-pulse flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-lg font-bold text-black transition hover:bg-gold-bright"
          >
            +
          </button>
        </div>
      </article>
    );
  }

  if (variant === "perfume") {
    return (
      <article className="flex flex-col overflow-hidden rounded-[var(--radius)] border border-border-soft bg-surface">
        <Link href={`/produto/${product.id}`} className="relative block aspect-square">
          <ProductPhoto product={product} className="h-full w-full" />
          <button
            type="button"
            aria-label="Favoritar"
            className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white/70"
            onClick={(e) => e.preventDefault()}
          >
            <HeartIcon />
          </button>
        </Link>
        <div className="flex flex-1 flex-col gap-2 p-3">
          <div>
            <Link
              href={`/produto/${product.id}`}
              className="block text-sm font-semibold leading-snug text-ink hover:text-gold"
            >
              {product.name}
            </Link>
            {product.scent && (
              <p className="mt-0.5 text-xs text-muted">{product.scent}</p>
            )}
            <p className="mt-1 font-bold text-gold">{formatBRL(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={() => addItem(product.id, 1)}
            className="mt-auto w-full rounded-[var(--radius-sm)] bg-gold py-2 text-center text-xs font-bold text-black transition hover:bg-gold-bright"
          >
            Adicionar ›
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-[var(--radius)] border border-border-soft bg-surface">
      <Link href={`/produto/${product.id}`} className="relative block aspect-square">
        <ProductPhoto product={product} className="h-full w-full" />
        <button
          type="button"
          aria-label="Favoritar"
          className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white/70"
          onClick={(e) => e.preventDefault()}
        >
          <HeartIcon />
        </button>
        {product.ageRestricted && (
          <span className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-gold bg-black/70 text-[10px] font-bold text-gold">
            18+
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div>
          <Link
            href={`/produto/${product.id}`}
            className="block text-sm font-semibold leading-snug text-ink hover:text-gold"
          >
            {product.name}
          </Link>
          <p className="mt-1 font-bold text-gold">{formatBRL(product.price)}</p>
        </div>
        <Link
          href={`/produto/${product.id}`}
          className="mt-auto block w-full rounded-[var(--radius-sm)] bg-gold py-2 text-center text-xs font-bold text-black transition hover:bg-gold-bright"
        >
          Ver detalhes ›
        </Link>
      </div>
    </article>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0112 8.2a3.8 3.8 0 017 2.6C19 15.6 12 20 12 20z" />
    </svg>
  );
}
