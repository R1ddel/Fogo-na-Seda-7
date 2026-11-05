"use client";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const btn =
    size === "sm"
      ? "h-7 w-7 text-sm"
      : "h-9 w-9 text-base";

  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        aria-label="Diminuir"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${btn} flex items-center justify-center rounded-full bg-gold font-bold text-black transition hover:bg-gold-bright disabled:opacity-40`}
      >
        −
      </button>
      <span className="min-w-6 text-center font-semibold tabular-nums text-ink">
        {value}
      </span>
      <button
        type="button"
        aria-label="Aumentar"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={`${btn} flex items-center justify-center rounded-full bg-gold font-bold text-black transition hover:bg-gold-bright disabled:opacity-40`}
      >
        +
      </button>
    </div>
  );
}
