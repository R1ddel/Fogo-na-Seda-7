"use client";

import { useEffect, useState } from "react";

const KEY = "fogo-age-ok-eletronicos";

export function AgeGate({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    setOk(sessionStorage.getItem(KEY) === "1");
  }, []);

  if (ok === null) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-muted">
        Carregando…
      </div>
    );
  }

  if (!ok) {
    return (
      <div className="mx-auto max-w-md px-4 py-10">
        <div className="rounded-[var(--radius)] border border-gold/70 bg-surface p-6 text-center shadow-[0_0_40px_rgba(232,185,35,0.12)]">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold text-lg font-bold text-gold">
            18+
          </span>
          <h2 className="font-display text-xl font-bold text-ink">
            Conteúdo exclusivo para maiores de 18 anos
          </h2>
          <p className="mt-2 text-sm text-muted">
            A categoria de cigarros eletrônicos é restrita. Confirme sua idade
            para continuar.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                sessionStorage.setItem(KEY, "1");
                setOk(true);
              }}
              className="w-full rounded-[var(--radius-sm)] bg-gold py-3 font-bold text-black hover:bg-gold-bright"
            >
              Tenho 18 anos ou mais
            </button>
            <a
              href="/"
              className="w-full rounded-[var(--radius-sm)] border border-border py-3 text-sm text-muted hover:text-ink"
            >
              Voltar à loja
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-start gap-3 rounded-[var(--radius-sm)] border border-gold/50 bg-gold-glow px-3 py-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold text-[11px] font-bold text-gold">
          18+
        </span>
        <p className="text-sm text-ink/90">
          <span className="font-semibold text-gold">
            Categoria exclusiva para maiores de 18 anos.
          </span>{" "}
          Ao navegar, você confirma ter idade legal.
        </p>
      </div>
      {children}
    </>
  );
}
