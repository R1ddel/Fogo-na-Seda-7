"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ProductPhoto } from "@/components/ProductPhoto";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useCart } from "@/context/CartContext";
import { formatBRL, getProduct } from "@/data/products";

export default function CartPage() {
  const {
    items,
    subtotal,
    deliveryFee,
    total,
    setQuantity,
    removeItem,
    count,
  } = useCart();

  return (
    <div className="min-h-dvh bg-bg pb-28">
      <Header />

      <main className="mx-auto max-w-2xl px-4 pt-6 md:px-6">
        <h1 className="font-display text-2xl font-extrabold text-ink md:text-3xl">
          Meu carrinho
        </h1>
        <p className="mt-1 text-sm text-muted">
          Confira seus itens e finalize seu pedido.
        </p>

        {items.length === 0 ? (
          <div className="mt-12 rounded-[var(--radius)] border border-border-soft bg-surface p-8 text-center">
            <p className="text-muted">Seu carrinho está vazio.</p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-[var(--radius-sm)] bg-gold px-5 py-2.5 text-sm font-bold text-black"
            >
              Continuar comprando
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-6 space-y-3">
              {items.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                const line = product.price * item.quantity;
                return (
                  <li
                    key={item.productId}
                    className="flex gap-3 rounded-[var(--radius)] border border-border-soft bg-surface p-3"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                      <ProductPhoto product={product} className="h-full w-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="truncate text-sm font-semibold text-ink">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted">
                            {formatBRL(product.price)} unid.
                          </p>
                          {item.note && (
                            <p className="mt-0.5 truncate text-xs text-muted italic">
                              Obs.: {item.note}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          aria-label="Remover"
                          onClick={() => removeItem(item.productId)}
                          className="rounded p-1 text-muted hover:text-danger"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <QuantitySelector
                          size="sm"
                          value={item.quantity}
                          onChange={(n) => setQuantity(item.productId, n)}
                          min={0}
                        />
                        <span className="font-bold text-gold">
                          {formatBRL(line)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-gold-bright"
            >
              + Adicionar mais produtos ›
            </Link>

            <section className="mt-8 rounded-[var(--radius)] border border-border-soft bg-surface p-4">
              <h2 className="text-sm font-semibold text-ink">
                Resumo do pedido
              </h2>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between text-muted">
                  <dt>Subtotal</dt>
                  <dd>{formatBRL(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-muted">
                  <dt>Entrega</dt>
                  <dd>{formatBRL(deliveryFee)}</dd>
                </div>
                <div className="flex justify-between border-t border-border-soft pt-2 text-base font-bold">
                  <dt className="text-ink">Total</dt>
                  <dd className="text-gold">{formatBRL(total)}</dd>
                </div>
              </dl>
            </section>
          </>
        )}
      </main>

      {count > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border-soft bg-bg/95 backdrop-blur-md">
          <div className="mx-auto max-w-2xl px-4 py-3 md:px-6">
            <Link
              href="/checkout"
              className="flex w-full items-center justify-center rounded-[var(--radius-sm)] bg-gold py-3.5 text-sm font-bold text-black hover:bg-gold-bright"
            >
              Continuar para pagamento ›
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16M9 7V5h6v2M8 7l1 12h6l1-12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
