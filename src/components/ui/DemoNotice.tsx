import type { ReactNode } from "react";

// A clear notice that a feature is a demonstration (no real payment, no real login...).

export default function DemoNotice({ children }: { children: ReactNode }) {
  return (
    <div role="note" className="flex gap-3 rounded-card border border-marigold bg-marigold-tint px-4 py-3 text-sm text-ink">
      <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-marigold text-xs font-bold">
        i
      </span>
      <div>{children}</div>
    </div>
  );
}
