import type { Product } from "@/data/products";

/** Stylized placeholder matching dark/gold product photography language */
export function ProductPhoto({
  product,
  className = "",
  large = false,
}: {
  product: Product;
  className?: string;
  large?: boolean;
}) {
  return (
    <div
      className={`product-photo relative overflow-hidden ${className}`}
      style={{
        background: `
          radial-gradient(circle at 35% 30%, ${product.accent ?? "#e8b923"}55, transparent 42%),
          radial-gradient(circle at 70% 70%, rgba(0,0,0,0.55), transparent 50%),
          linear-gradient(160deg, #1a120a 0%, #0a0a0a 55%, ${product.accent ?? "#2a2010"}44 100%)
        `,
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(232,185,35,0.03) 12px, rgba(232,185,35,0.03) 24px)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
        <Shape filter={product.filter} large={large} />
        {!large && (
          <span className="max-w-[90%] truncate text-[10px] font-medium uppercase tracking-wider text-white/45">
            {product.filter}
          </span>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}

function Shape({ filter, large }: { filter: string; large?: boolean }) {
  const size = large ? 64 : 40;
  const common = {
    width: size,
    height: size,
    className:
      "text-gold/85 drop-shadow-[0_4px_20px_rgba(232,185,35,0.4)]",
    viewBox: "0 0 48 48",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.6,
  };

  if (filter === "Espetinhos" || filter === "Combos") {
    return (
      <svg {...common}>
        <path d="M24 6v32" strokeLinecap="round" />
        <ellipse cx="24" cy="16" rx="8" ry="5" fill="currentColor" opacity="0.35" />
        <ellipse cx="24" cy="26" rx="8" ry="5" fill="currentColor" opacity="0.5" />
        <path d="M20 38h8" strokeLinecap="round" />
      </svg>
    );
  }
  if (filter === "Bebidas") {
    return (
      <svg {...common}>
        <path d="M16 10h16l-2 28H18L16 10z" />
        <path d="M18 18h12" opacity="0.5" />
        <circle cx="22" cy="26" r="1.5" fill="currentColor" />
        <circle cx="27" cy="30" r="1.2" fill="currentColor" />
      </svg>
    );
  }
  if (
    filter === "Dispositivos" ||
    filter === "Descartáveis" ||
    filter === "Pods" ||
    filter === "Acessórios"
  ) {
    return (
      <svg {...common}>
        <rect x="18" y="8" width="12" height="28" rx="4" />
        <path d="M22 12h4" strokeLinecap="round" />
        <circle cx="24" cy="28" r="2" fill="currentColor" />
      </svg>
    );
  }
  if (
    filter === "Masculino" ||
    filter === "Feminino" ||
    filter === "Unissex" ||
    filter === "Kits"
  ) {
    return (
      <svg {...common}>
        <path d="M24 6c6 8 10 12 10 18a10 10 0 11-20 0c0-6 4-10 10-18z" fill="currentColor" opacity="0.25" />
        <path d="M24 10c4.5 6 7.5 9.5 7.5 14a7.5 7.5 0 11-15 0c0-4.5 3-8.5 7.5-14z" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="10" y="14" width="28" height="20" rx="3" />
      <path d="M14 20h20M14 26h12" strokeLinecap="round" opacity="0.7" />
      <circle cx="32" cy="26" r="2.5" fill="currentColor" />
    </svg>
  );
}
