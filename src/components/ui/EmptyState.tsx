import type { ReactNode } from "react";

// Shown when a list has nothing to display (empty cart, no search results...).

interface EmptyStateProps {
  title: string;
  message: string;
  action?: ReactNode;
}

export default function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-card border border-dashed border-line bg-white px-6 py-12 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-md text-ink-soft">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
