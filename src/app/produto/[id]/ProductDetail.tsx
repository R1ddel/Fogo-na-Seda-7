"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductPhoto } from "@/components/ProductPhoto";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useCart } from "@/context/CartContext";
import { formatBRL, type Product } from "@/data/products";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [added, setAdded] = useState(false);

  const lineTotal = product.price * qty;
  const backHref = `/categoria/${product.department}`;

  return (
    <div className="min-h-dvh bg-bg pb-28">
      <Header />

      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-gold"
          >
            <span aria-hidden>‹</span> Voltar
          </Link>
        </div>

        <div className="relative aspect-[5/4] w-full md:mx-6 md:aspect-[16/9] md:overflow-hidden md:rounded-[var(--radius)]">
          <ProductPhoto product={product} large className="h-full w-full" />
          <button
            type="button"
            aria-label="Favoritar"
            className="absolute right-4 top-4 rounded-full bg-black/50 p-2.5 text-white/80 backdrop-blur-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0112 8.2a3.8 3.8 0 017 2.6C19 15.6 12 20 12 20z" />
            </svg>
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          </div>
        </div>

        <div className="px-4 pt-5 md:px-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="font-display text-2xl font-extrabold text-ink md:text-3xl">
              {product.name}
            </h1>
            {product.ageRestricted && (
              <span className="rounded-full border border-gold px-2.5 py-1 text-xs font-bold text-gold">
                18+
              </span>
            )}
          </div>
          <p className="mt-2 text-2xl font-bold text-gold">
            {formatBRL(product.price)}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {product.description}
          </p>

          {product.tagline && (
            <p className="mt-4 flex items-start gap-2 text-sm text-ink">
              <span className="mt-0.5 text-gold" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7L12 15.8 6.4 19.5l2.1-6.7L3 8.8h6.8L12 2z" />
                </svg>
              </span>
              <span>{product.tagline}</span>
            </p>
          )}

          {product.scent && (
            <p className="mt-3 text-sm text-muted">
              Família olfativa:{" "}
              <span className="text-ink">{product.scent}</span>
            </p>
          )}

          <label className="mt-8 block">
            <span className="mb-2 block text-sm font-semibold text-ink">
              Alguma observação?
            </span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Ex.: ponto da carne, sem gelo, embrulhar para presente…"
              className="w-full resize-none rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-3 text-sm text-ink placeholder:text-muted"
            />
          </label>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border-soft bg-bg/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3 md:px-6">
          <QuantitySelector value={qty} onChange={setQty} />
          <button
            type="button"
            onClick={() => {
              addItem(product.id, qty, note.trim() || undefined);
              setAdded(true);
              setTimeout(() => setAdded(false), 1600);
            }}
            className="btn-gold-pulse flex-1 rounded-[var(--radius-sm)] bg-gold py-3.5 text-sm font-bold text-black hover:bg-gold-bright"
          >
            {added
              ? "Adicionado ✓"
              : `Adicionar · ${formatBRL(lineTotal)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
