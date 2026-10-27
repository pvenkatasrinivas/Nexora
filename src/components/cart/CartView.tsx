"use client";

import Button, { ButtonLink } from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { useCart } from "@/context/CartContext";
import CartItemRow from "./CartItemRow";
import OrderSummary from "./OrderSummary";

export default function CartView() {
  const { lines, itemCount, subtotal, shipping, total, hasProblems, isLoaded, clearCart } = useCart();

  if (!isLoaded) {
    return <p className="py-10 text-ink-soft">Loading your cart…</p>;
  }

  if (lines.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Products you add will show up here, and stay here while you keep browsing."
        action={<ButtonLink href="/products">Browse products</ButtonLink>}
      />
    );
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
      <section aria-labelledby="cart-items-heading" className="rounded-card border border-line bg-white px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 border-b border-line py-4">
          <h2 id="cart-items-heading" className="font-sans text-base font-bold">
            {itemCount} item{itemCount === 1 ? "" : "s"} in your cart
          </h2>
          <Button variant="ghost" size="sm" onClick={clearCart}>
            Empty cart
          </Button>
        </div>
        <ul className="divide-y divide-line">
          {lines.map((line) => (
            <CartItemRow key={line.product.id} line={line} />
          ))}
        </ul>
      </section>

      <div className="lg:sticky lg:top-24">
        <OrderSummary
          itemCount={itemCount}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          showFreeShippingHint
          footer={
            <>
              {hasProblems ? (
                <p className="text-sm font-semibold text-danger">Fix the items marked in red to continue to checkout.</p>
              ) : (
                <ButtonLink href="/checkout" size="lg" fullWidth>
                  Proceed to checkout
                </ButtonLink>
              )}
              <ButtonLink href="/products" variant="secondary" fullWidth>
                Continue shopping
              </ButtonLink>
            </>
          }
        />
      </div>
    </div>
  );
}
