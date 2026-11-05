"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { useCart } from "@/context/CartContext";

const nav = [
  { href: "/", label: "Início" },
  { href: "/#departamentos", label: "Produtos" },
  { href: "/#destaques", label: "Ofertas" },
  { href: "/#loja", label: "A loja" },
];

export function Header({
  showSearch = false,
  onSearch,
  searchValue,
}: {
  showSearch?: boolean;
  onSearch?: (q: string) => void;
  searchValue?: string;
}) {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-[var(--header-h)] max-w-6xl items-center gap-3 px-4 md:gap-6 md:px-6">
        <button
          type="button"
          className="md:hidden -ml-1 rounded-lg p-2 text-ink hover:bg-surface"
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon />
        </button>

        <Logo size="sm" />

        <nav className="ml-4 hidden items-center gap-6 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.replace("/#", "/"));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  active
                    ? "gold-underline font-semibold text-gold"
                    : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          {showSearch && (
            <label className="relative hidden w-56 lg:block xl:w-72">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                <SearchIcon />
              </span>
              <input
                type="search"
                value={searchValue ?? ""}
                onChange={(e) => onSearch?.(e.target.value)}
                placeholder="Buscar..."
                className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-muted"
              />
            </label>
          )}

          <Link
            href="/carrinho"
            className="relative rounded-lg p-2 text-gold transition-colors hover:bg-surface"
            aria-label={`Carrinho com ${count} itens`}
          >
            <CartIcon />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-black">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="border-t border-border-soft bg-bg-elevated px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-surface"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/categoria/lazer"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-gold hover:bg-surface"
            >
              Cardápio · Espetinhos
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 7h15l-1.5 9h-12L6 7z" strokeLinejoin="round" />
      <path d="M6 7l-1-3H2" strokeLinecap="round" />
      <circle cx="9" cy="20" r="1.2" fill="currentColor" />
      <circle cx="17" cy="20" r="1.2" fill="currentColor" />
    </svg>
  );
}
