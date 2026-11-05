"use client";

import Link from "next/link";
import { formatBRL } from "@/data/products";
import { useCart } from "@/context/CartContext";

export function CartBar() {
  const { count, subtotal } = useCart();
  if (count === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 p-3 md:p-4">
      <Link
        href="/carrinho"
        className="pointer-events-auto mx-auto flex max-w-lg items-center justify-between gap-3 rounded-[var(--radius)] bg-gold px-4 py-3.5 text-black shadow-[0_8px_32px_rgba(232,185,35,0.35)] transition hover:bg-gold-bright"
      >
        <span className="text-sm font-semibold">
          Ver carrinho · {count} {count === 1 ? "item" : "itens"}
        </span>
        <span className="text-sm font-bold tabular-nums">
          {formatBRL(subtotal)} ›
        </span>
      </Link>
    </div>
  );
}
