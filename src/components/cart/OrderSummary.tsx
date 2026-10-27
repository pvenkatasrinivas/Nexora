import type { ReactNode } from "react";
import { FREE_SHIPPING_FROM } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

// The price breakdown box used on the cart, checkout and confirmation pages.

interface OrderSummaryProps {
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  /** Optional content above the totals (e.g. the list of items). */
  children?: ReactNode;
  /** Optional content below the totals (e.g. buttons). */
  footer?: ReactNode;
  showFreeShippingHint?: boolean;
}

export default function OrderSummary({
  itemCount,
  subtotal,
  shipping,
  total,
  children,
  footer,
  showFreeShippingHint = false,
}: OrderSummaryProps) {
  const amountForFreeShipping = FREE_SHIPPING_FROM - subtotal;

  return (
    <section aria-labelledby="summary-heading" className="rounded-card border border-line bg-white p-5 sm:p-6">
      <h2 id="summary-heading" className="text-xl font-bold">
        Order summary
      </h2>
      {children}
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-ink-soft">
            Subtotal ({itemCount} item{itemCount === 1 ? "" : "s"})
          </dt>
          <dd className="font-semibold tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-soft">Delivery</dt>
          <dd className="font-semibold tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-line pt-3 text-base">
          <dt className="font-bold">Total</dt>
          <dd className="font-bold tabular-nums">{formatPrice(total)}</dd>
        </div>
      </dl>
      {showFreeShippingHint && amountForFreeShipping > 0 && (
        <p className="mt-4 rounded-control bg-marigold-tint px-3 py-2 text-sm text-ink">
          Add {formatPrice(amountForFreeShipping)} more to get free delivery.
        </p>
      )}
      {footer && <div className="mt-5 flex flex-col gap-3">{footer}</div>}
    </section>
  );
}
