import Link from "next/link";
import type { Department } from "@/data/products";

export function DepartmentCard({
  department,
  index = 0,
}: {
  department: Department;
  index?: number;
}) {
  return (
    <article
      className="animate-fade-up group flex flex-col overflow-hidden rounded-[var(--radius)] border border-border-soft bg-surface transition duration-300 hover:border-gold/40 hover:shadow-[0_8px_40px_rgba(232,185,35,0.08)]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <Link href={department.href} className="relative block aspect-[16/10]">
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
          style={{
            background: `
              radial-gradient(circle at 60% 40%, ${department.accent}88, transparent 50%),
              linear-gradient(145deg, #1a120c, #080808 70%)
            `,
          }}
        />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(120deg,transparent,transparent_14px,rgba(232,185,35,0.03)_14px,rgba(232,185,35,0.03)_28px)]" />
        {department.ageRestricted && (
          <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold bg-black/70 text-xs font-bold text-gold">
            18+
          </span>
        )}
        <div className="absolute inset-0 flex items-end p-4">
          <span className="font-display text-lg font-bold tracking-wide text-white drop-shadow-md md:text-xl">
            {department.title}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-sm leading-relaxed text-muted">
          {department.description}
        </p>
        <Link
          href={department.href}
          className="mt-auto inline-flex w-fit items-center rounded-[var(--radius-sm)] bg-gold px-4 py-2 text-sm font-bold text-black transition hover:bg-gold-bright"
        >
          Explorar ›
        </Link>
      </div>
    </article>
  );
}
