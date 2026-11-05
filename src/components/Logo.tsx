import Link from "next/link";

export function Logo({
  size = "md",
  href = "/",
}: {
  size?: "sm" | "md" | "lg";
  href?: string;
}) {
  const scale =
    size === "lg" ? "text-xl md:text-2xl" : size === "sm" ? "text-sm" : "text-base md:text-lg";
  const icon =
    size === "lg" ? "h-9 w-9" : size === "sm" ? "h-6 w-6" : "h-7 w-7 md:h-8 md:w-8";

  return (
    <Link href={href} className="group flex items-center gap-2.5 shrink-0">
      <span
        className={`${icon} relative flex items-center justify-center rounded-full bg-gradient-to-br from-gold-bright via-gold to-gold-dim shadow-[0_0_20px_rgba(232,185,35,0.25)]`}
        aria-hidden
      >
        <svg viewBox="0 0 32 32" className="h-[70%] w-[70%] text-black" fill="currentColor">
          <path d="M16 3c1.2 4.2-1.4 6.8-1.4 10.2 0 2.4 1.5 3.8 1.5 3.8S13 15.2 13 12.4C13 8.6 15 5.6 16 3zm0 26c-5.5 0-9-3.8-9-9.2 0-4.2 2.6-7.2 5.2-9.6.4 3.2 2.4 5.2 4 6.6 1.5-1.4 3.4-3.5 3.8-6.8C22.6 12.4 25 15.4 25 19.8 25 25.2 21.5 29 16 29z" />
        </svg>
      </span>
      <span className="leading-tight">
        <span
          className={`block font-display font-bold tracking-[0.06em] text-gold ${scale} group-hover:text-gold-bright transition-colors`}
        >
          FOGO NA SEDA
        </span>
        <span className="block text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-muted">
          Tabacaria · Headshop
        </span>
      </span>
    </Link>
  );
}
