// Small helpers for showing values to the user.

const rupeeFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** 4499 -> "₹4,499" */
export function formatPrice(amount: number): string {
  return rupeeFormatter.format(amount);
}

/** ISO date string -> "27 Oct 2026, 7:15 am" */
export function formatDateTime(isoDate: string): string {
  return new Date(isoDate).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
