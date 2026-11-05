"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { FilterPills } from "@/components/FilterPills";
import { SearchField } from "@/components/SearchField";
import { ProductCard } from "@/components/ProductCard";
import { CartBar } from "@/components/CartBar";
import { AgeGate } from "@/components/AgeGate";
import {
  getProductsByDepartment,
  type Department,
  type DepartmentSlug,
} from "@/data/products";

export function CategoryView({ department }: { department: Department }) {
  const [filter, setFilter] = useState(department.filters[0] ?? "Todos");
  const [query, setQuery] = useState("");

  const products = useMemo(() => {
    const list = getProductsByDepartment(
      department.slug as DepartmentSlug,
      filter,
    );
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }, [department.slug, filter, query]);

  const isLazer = department.slug === "lazer";
  const isPerfume = department.slug === "perfumes";
  const isElectro = department.slug === "eletronicos";

  const cardVariant = isLazer
    ? "menu"
    : isPerfume
      ? "perfume"
      : "grid";

  const content = (
    <>
      <div className="mb-4 space-y-3">
        <SearchField value={query} onChange={setQuery} />
        <FilterPills
          filters={department.filters}
          active={filter}
          onChange={setFilter}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} variant={cardVariant} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="py-12 text-center text-muted">
          Nenhum produto encontrado.
        </p>
      )}
    </>
  );

  return (
    <div className={`min-h-dvh bg-bg ${isLazer ? "pb-24" : "pb-10"}`}>
      <Header />

      <main className="mx-auto max-w-6xl px-4 pt-5 md:px-6 md:pt-8">
        <nav className="mb-3 text-xs text-muted">
          <Link href="/" className="hover:text-gold">
            Início
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink">{department.title}</span>
        </nav>

        {isLazer ? (
          <header className="mb-6">
            <h1 className="font-display text-3xl font-extrabold text-ink">
              Cardápio
            </h1>
            <p className="mt-1 text-sm text-muted">
              Espetinhos e bebidas geladas, feitos para o seu momento.
            </p>
          </header>
        ) : isPerfume ? (
          <header className="relative mb-6 overflow-hidden rounded-[var(--radius)] border border-border-soft">
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at 70% 40%, ${department.accent}99, transparent 50%),
                  linear-gradient(120deg, #120a14, #050505 70%)
                `,
              }}
            />
            <div className="relative px-5 py-10 md:px-8 md:py-14">
              <h1 className="font-display text-3xl font-extrabold text-ink md:text-4xl">
                {department.title}
              </h1>
              <p className="mt-2 max-w-md text-sm text-muted">
                {department.description}
              </p>
            </div>
          </header>
        ) : (
          <header className="mb-5 flex items-center gap-3">
            <h1 className="font-display text-2xl font-extrabold text-ink md:text-3xl">
              {department.title}
            </h1>
            {department.ageRestricted && (
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold text-xs font-bold text-gold">
                18+
              </span>
            )}
          </header>
        )}

        {isElectro ? <AgeGate>{content}</AgeGate> : content}
      </main>

      {isLazer && <CartBar />}

      {!isLazer && (
        <footer className="mx-auto mt-10 flex max-w-6xl flex-wrap gap-6 border-t border-border-soft px-4 py-6 text-sm text-muted md:px-6">
          <span>Compra segura</span>
          <span>Retirada ou entrega</span>
        </footer>
      )}
    </div>
  );
}
