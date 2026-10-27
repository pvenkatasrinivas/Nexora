import Link from "next/link";

// The Nexora wordmark. The mark is an "N" made of two bars and a marigold dot.

export default function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-control" aria-label="Nexora home">
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill={onDark ? "#FFFFFF" : "#2B2D8A"} />
        <path d="M9 23V9l14 14V9" fill="none" stroke={onDark ? "#2B2D8A" : "#FFFFFF"} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="25" cy="7" r="3.5" fill="#F2A900" />
      </svg>
      <span className={`font-display text-xl font-bold tracking-tight ${onDark ? "text-white" : "text-ink"}`}>Nexora</span>
    </Link>
  );
}
