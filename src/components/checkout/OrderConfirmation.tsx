"use client";

import { useEffect, useState } from "react";
import OrderSummary from "@/components/cart/OrderSummary";
import { ButtonLink } from "@/components/ui/Button";
import DemoNotice from "@/components/ui/DemoNotice";
import EmptyState from "@/components/ui/EmptyState";
import { formatDateTime, formatPrice } from "@/lib/format";
import { loadFromStorage, STORAGE_KEYS } from "@/lib/storage";
import type { Order } from "@/types";

export default function OrderConfirmation() {
  // undefined = still loading, null = no order saved
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage is only possible after mount
    setOrder(loadFromStorage<Order | null>(STORAGE_KEYS.lastOrder, null));
  }, []);

  if (order === undefined) {
    return <p className="py-10 text-ink-soft">Loading your order…</p>;
  }

  if (order === null) {
    return (
      <EmptyState
        title="No recent order"
        message="Orders you place on this device will show up here."
        action={<ButtonLink href="/products">Start shopping</ButtonLink>}
      />
    );
  }

  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
      <div className="flex flex-col gap-6">
        <section className="rounded-card border border-success/30 bg-success-tint p-5 sm:p-6" aria-labelledby="thanks-heading">
          <div className="flex items-start gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-success text-white" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            <div>
              <h2 id="thanks-heading" className="text-2xl font-bold">
                Thanks, {order.customer.fullName.split(" ")[0]}! Your order is placed.
              </h2>
              <p className="mt-1 text-ink">
                Order number <strong className="tabular-nums">{order.id}</strong>, placed on {formatDateTime(order.createdAt)}.
              </p>
            </div>
          </div>
        </section>

        <DemoNotice>This was a demo order. No payment was taken, no email was sent, and nothing will be delivered.</DemoNotice>

        <section className="rounded-card border border-line bg-white p-5 sm:p-6" aria-labelledby="delivery-heading">
          <h2 id="delivery-heading" className="text-xl font-bold">
            Delivery details
          </h2>
          <address className="mt-3 not-italic leading-relaxed text-ink">
            {order.customer.fullName}
            <br />
            {order.customer.address}
            <br />
            {order.customer.city} {order.customer.pincode}
            <br />
            <span className="text-ink-soft">
              {order.customer.phone}, {order.customer.email}
            </span>
          </address>
          <p className="mt-4 text-sm text-ink-soft">Payment: cash on delivery (demo)</p>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/products" size="lg">
            Continue shopping
          </ButtonLink>
          <ButtonLink href="/" size="lg" variant="secondary">
            Back to home
          </ButtonLink>
        </div>
      </div>

      <OrderSummary itemCount={itemCount} subtotal={order.subtotal} shipping={order.shipping} total={order.total}>
        <ul className="mt-4 divide-y divide-line border-y border-line text-sm">
          {order.items.map((item) => (
            <li key={item.productId} className="flex justify-between gap-3 py-2.5">
              <span className="min-w-0">
                {item.name} <span className="text-ink-soft">× {item.quantity}</span>
              </span>
              <span className="shrink-0 font-semibold tabular-nums">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      </OrderSummary>
    </div>
  );
}
