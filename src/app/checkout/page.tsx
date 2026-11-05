"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header } from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { formatBRL } from "@/data/products";

type Fulfillment = "entrega" | "retirada";
type Payment = "pix" | "cartao" | "dinheiro";

export default function CheckoutPage() {
  const router = useRouter();
  const { count, total, clear, items } = useCart();
  const [step] = useState(1);
  const [fulfillment, setFulfillment] = useState<Fulfillment>("entrega");
  const [payment, setPayment] = useState<Payment>("pix");
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    street: "",
    neighborhood: "",
    complement: "",
  });

  if (items.length === 0 && !done) {
    return (
      <div className="min-h-dvh bg-bg">
        <Header />
        <div className="mx-auto max-w-md px-4 py-16 text-center">
          <p className="text-muted">Carrinho vazio.</p>
          <Link href="/" className="mt-4 inline-block text-gold">
            Voltar à loja
          </Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-dvh bg-bg">
        <Header />
        <div className="mx-auto max-w-md px-4 py-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-2xl font-bold text-black">
            ✓
          </div>
          <h1 className="font-display text-2xl font-bold text-ink">
            Pedido confirmado
          </h1>
          <p className="mt-2 text-sm text-muted">
            Em breve entraremos em contato pelo WhatsApp. Obrigado por escolher
            a Fogo na Seda.
          </p>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-6 rounded-[var(--radius-sm)] bg-gold px-5 py-3 text-sm font-bold text-black"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="min-h-dvh bg-bg pb-28">
      <Header />

      <main className="mx-auto max-w-2xl px-4 pt-6 md:px-6">
        <h1 className="font-display text-2xl font-extrabold text-ink">
          Finalizar pedido
        </h1>

        <ol className="mt-6 flex items-center gap-2">
          {[
            { n: 1, label: "Entrega" },
            { n: 2, label: "Pagamento" },
            { n: 3, label: "Revisão" },
          ].map((s, i) => (
            <li key={s.n} className="flex flex-1 items-center gap-2">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  step >= s.n
                    ? "bg-gold text-black"
                    : "border border-border text-muted"
                }`}
              >
                {s.n}
              </span>
              <span
                className={`text-xs ${step >= s.n ? "text-gold" : "text-muted"}`}
              >
                {s.label}
              </span>
              {i < 2 && (
                <span className="mx-1 h-px flex-1 bg-border" aria-hidden />
              )}
            </li>
          ))}
        </ol>

        <div className="mt-6 grid grid-cols-2 gap-2">
          {(
            [
              ["entrega", "Entrega"],
              ["retirada", "Retirada"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFulfillment(key)}
              className={`rounded-[var(--radius-sm)] py-3 text-sm font-semibold transition ${
                fulfillment === key
                  ? "bg-gold text-black"
                  : "border border-gold/50 text-ink hover:border-gold"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <section className="mt-6 space-y-3">
          <h2 className="text-sm font-semibold text-ink">Seus dados</h2>
          <Field
            icon={<UserIcon />}
            placeholder="Nome completo"
            value={form.name}
            onChange={set("name")}
          />
          <Field
            icon={<PhoneIcon />}
            placeholder="WhatsApp"
            value={form.whatsapp}
            onChange={set("whatsapp")}
            type="tel"
          />
        </section>

        {fulfillment === "entrega" && (
          <section className="mt-6 space-y-3">
            <h2 className="text-sm font-semibold text-ink">Endereço</h2>
            <Field
              icon={<PinIcon />}
              placeholder="Rua e número"
              value={form.street}
              onChange={set("street")}
            />
            <Field
              icon={<HomeIcon />}
              placeholder="Bairro"
              value={form.neighborhood}
              onChange={set("neighborhood")}
            />
            <Field
              icon={<TagIcon />}
              placeholder="Complemento (opcional)"
              value={form.complement}
              onChange={set("complement")}
            />
          </section>
        )}

        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold text-ink">
            Forma de pagamento
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                ["pix", "Pix"],
                ["cartao", "Cartão na entrega"],
                ["dinheiro", "Dinheiro"],
              ] as const
            ).map(([key, label]) => {
              const selected = payment === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPayment(key)}
                  className={`relative rounded-[var(--radius-sm)] border px-2 py-4 text-center text-xs font-semibold transition ${
                    selected
                      ? "border-gold bg-gold-glow text-gold"
                      : "border-border text-muted hover:border-gold/50 hover:text-ink"
                  }`}
                >
                  {selected && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] text-black">
                      ✓
                    </span>
                  )}
                  {label}
                </button>
              );
            })}
          </div>
        </section>

        <div className="mt-8 flex items-center justify-between rounded-[var(--radius)] border border-border-soft bg-surface px-4 py-3 text-sm">
          <span className="text-muted">
            {count} {count === 1 ? "item" : "itens"}
          </span>
          <span className="font-bold text-gold">{formatBRL(total)}</span>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border-soft bg-bg/95 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-4 py-3 md:px-6">
          <button
            type="button"
            onClick={() => {
              clear();
              setDone(true);
            }}
            className="w-full rounded-[var(--radius-sm)] bg-gold py-3.5 text-sm font-bold text-black hover:bg-gold-bright"
          >
            Confirmar pedido ›
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) {
  return (
    <label className="relative block">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
        {icon}
      </span>
      <input
        {...props}
        className="w-full rounded-[var(--radius-sm)] border border-border bg-surface py-3 pl-10 pr-3 text-sm text-ink placeholder:text-muted"
      />
    </label>
  );
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 3h4l1 5-2.5 1.5a12 12 0 005 5L16 12l5 1v4a2 2 0 01-2 2A15 15 0 015 5a2 2 0 012-2z" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9z" />
    </svg>
  );
}
function TagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 12V5a2 2 0 012-2h7l9 9-9 9-9-9z" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    </svg>
  );
}
