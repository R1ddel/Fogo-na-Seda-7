"use client";

export function FilterPills({
  filters,
  active,
  onChange,
}: {
  filters: string[];
  active: string;
  onChange: (f: string) => void;
}) {
  return (
    <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
      {filters.map((f) => {
        const selected = f === active;
        return (
          <button
            key={f}
            type="button"
            onClick={() => onChange(f)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              selected
                ? "bg-gold text-black"
                : "border border-gold/60 bg-transparent text-ink hover:border-gold hover:text-gold"
            }`}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}
