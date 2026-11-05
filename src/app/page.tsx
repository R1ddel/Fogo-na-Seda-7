import Link from "next/link";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { DepartmentCard } from "@/components/DepartmentCard";
import { ProductCard } from "@/components/ProductCard";
import { departments, getHighlights } from "@/data/products";

const trust = [
  { label: "Entrega para toda a região", icon: "truck" },
  { label: "Pagamento seguro", icon: "shield" },
  { label: "Produtos selecionados", icon: "star" },
  { label: "Compra discreta", icon: "lock" },
] as const;

export default function HomePage() {
  const tabacariaDepts = departments.filter((d) => d.slug !== "lazer");
  const lazerDept = departments.find((d) => d.slug === "lazer")!;
  const highlights = getHighlights();

  return (
    <div className="min-h-dvh bg-bg">
      <Header showSearch />

      <section className="relative isolate overflow-hidden">
        <div className="hero-image-plane absolute inset-0" aria-hidden />
        <div className="hero-glow absolute inset-0" aria-hidden />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-10 pt-16 md:min-h-[72vh] md:justify-center md:px-6 md:pb-16 md:pt-20">
          <div className="max-w-xl">
            <div className="animate-fade-up mb-6 md:mb-8">
              <Logo size="lg" href="/" />
            </div>
            <h1 className="animate-fade-up-delay font-display text-3xl font-extrabold leading-[1.15] tracking-tight text-ink sm:text-4xl md:text-5xl">
              Tudo da Fogo na Seda em um só lugar
            </h1>
            <p className="animate-fade-up-delay-2 mt-4 max-w-md text-base text-muted md:text-lg">
              Tabacaria, eletrônicos 18+, perfumes árabes e a área de lazer com
              espetinhos e bebidas.
            </p>
            <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
              <a
                href="#departamentos"
                className="btn-gold-pulse rounded-[var(--radius-sm)] bg-gold px-5 py-3 text-sm font-bold text-black hover:bg-gold-bright"
              >
                Ver departamentos
              </a>
              <Link
                href="/categoria/lazer"
                className="rounded-[var(--radius-sm)] border border-gold/70 px-5 py-3 text-sm font-semibold text-gold hover:bg-gold-glow"
              >
                Cardápio de lazer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-bg-elevated">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-5 md:grid-cols-4 md:px-6 md:py-6">
          {trust.map((t) => (
            <li key={t.label} className="flex items-center gap-3 text-sm text-muted">
              <TrustIcon name={t.icon} />
              <span>{t.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="departamentos" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Tabacaria
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink md:text-3xl">
            Nossos departamentos
          </h2>
          <p className="mt-2 text-muted">
            Explore a loja completa — começando pela tabacaria e especialidades.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tabacariaDepts.map((d, i) => (
            <DepartmentCard key={d.slug} department={d} index={i} />
          ))}
        </div>
      </section>

      <section id="destaques" className="border-t border-border-soft bg-bg-elevated">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
                Destaques da semana
              </h2>
              <p className="mt-2 text-muted">Seleção em alta na Fogo na Seda.</p>
            </div>
          </div>
          <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
            {highlights.slice(0, 4).map((p) => (
              <div key={p.id} className="w-[70%] shrink-0 sm:w-[45%] md:w-auto">
                <ProductCard product={p} variant="highlight" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lazer" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Área de lazer
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink md:text-3xl">
            Espetinhos & Bebidas
          </h2>
          <p className="mt-2 text-muted">
            Cardápio quente e bebidas geladas — peça para entrega ou retirada.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <DepartmentCard department={lazerDept} index={0} />
          <div className="flex flex-col justify-center rounded-[var(--radius)] border border-border-soft bg-surface p-6 md:p-8">
            <h3 className="font-display text-xl font-bold text-ink">
              Peça pelo app
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Monte seu pedido no cardápio, escolha entrega ou retirada e pague
              com Pix, cartão na entrega ou dinheiro.
            </p>
            <Link
              href="/categoria/lazer"
              className="mt-6 inline-flex w-fit rounded-[var(--radius-sm)] bg-gold px-5 py-3 text-sm font-bold text-black hover:bg-gold-bright"
            >
              Abrir cardápio ›
            </Link>
          </div>
        </div>
      </section>

      <footer id="loja" className="border-t border-border-soft bg-bg-elevated">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
          <Logo size="sm" />
          <div className="flex flex-wrap gap-6 text-sm text-muted">
            <span className="flex items-center gap-2">
              <ShieldTiny /> Compra segura
            </span>
            <span className="flex items-center gap-2">
              <PinTiny /> Retirada ou entrega
            </span>
          </div>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Fogo na Seda · 18+ onde aplicável
          </p>
        </div>
      </footer>
    </div>
  );
}

function TrustIcon({ name }: { name: (typeof trust)[number]["icon"] }) {
  const cls = "h-9 w-9 shrink-0 rounded-full border border-gold/40 bg-gold-glow p-2 text-gold";
  if (name === "truck") {
    return (
      <span className={cls}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7V10z" />
          <circle cx="7" cy="18" r="1.5" />
          <circle cx="17" cy="18" r="1.5" />
        </svg>
      </span>
    );
  }
  if (name === "shield") {
    return (
      <span className={cls}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
        </svg>
      </span>
    );
  }
  if (name === "star") {
    return (
      <span className={cls}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3l2.4 6.6H21l-5.2 4 2 6.4L12 16.8 6.2 20l2-6.4L3 9.6h6.6L12 3z" />
        </svg>
      </span>
    );
  }
  return (
    <span className={cls}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 118 0v3" />
      </svg>
    </span>
  );
}

function ShieldTiny() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gold">
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
    </svg>
  );
}

function PinTiny() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gold">
      <path d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
