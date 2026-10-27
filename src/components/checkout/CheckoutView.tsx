"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import OrderSummary from "@/components/cart/OrderSummary";
import Button, { ButtonLink } from "@/components/ui/Button";
import DemoNotice from "@/components/ui/DemoNotice";
import EmptyState from "@/components/ui/EmptyState";
import { TextAreaField, TextField } from "@/components/ui/FormField";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { formatPrice } from "@/lib/format";
import { createOrder } from "@/lib/orders";
import { saveToStorage, STORAGE_KEYS } from "@/lib/storage";
import { hasErrors, validateCheckout } from "@/lib/validation";
import type { CheckoutForm, FormErrors } from "@/types";

const EMPTY_FORM: CheckoutForm = { fullName: "", email: "", phone: "", address: "", city: "", pincode: "" };

// Order of the fields on screen, used to focus the first field with an error.
const FIELD_ORDER: (keyof CheckoutForm)[] = ["fullName", "email", "phone", "address", "city", "pincode"];

export default function CheckoutView() {
  const router = useRouter();
  const cart = useCart();
  const { getProduct, updateProduct } = useProducts();

  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors<CheckoutForm>>({});
  const [isPlacing, setIsPlacing] = useState(false);

  /** Updates one field and clears its error once the user starts fixing it. */
  function updateField(field: keyof CheckoutForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // stop the browser from reloading the page

    const newErrors = validateCheckout(form);
    if (hasErrors(newErrors)) {
      setErrors(newErrors);
      // Move keyboard focus to the first field that needs fixing.
      const firstInvalid = FIELD_ORDER.find((field) => newErrors[field]);
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    setIsPlacing(true);
    const order = createOrder(form, cart);

    // Demo "order processing": reduce stock, remember the order, empty the cart.
    for (const item of order.items) {
      const product = getProduct(item.productId);
      if (product) updateProduct(product.id, { stock: Math.max(0, product.stock - item.quantity) });
    }
    saveToStorage(STORAGE_KEYS.lastOrder, order);
    cart.clearCart();
    router.push("/order-confirmation");
  }

  if (isPlacing) {
    return <p className="py-10 text-ink-soft" role="status">Placing your order…</p>;
  }

  if (!cart.isLoaded) {
    return <p className="py-10 text-ink-soft">Loading your cart…</p>;
  }

  if (cart.lines.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Add something to your cart before checking out."
        action={<ButtonLink href="/products">Browse products</ButtonLink>}
      />
    );
  }

  if (cart.hasProblems) {
    return (
      <EmptyState
        title="Some items need your attention"
        message="One or more products in your cart are out of stock or over the available quantity."
        action={<ButtonLink href="/cart">Review cart</ButtonLink>}
      />
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
      {/* noValidate: we show our own friendly messages instead of the browser's */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 rounded-card border border-line bg-white p-5 sm:p-6">
        <DemoNotice>
          <strong>This is a demo checkout.</strong> No payment is taken and nothing is delivered. Orders are paid “cash on delivery” in this demo.
        </DemoNotice>

        {errorCount > 0 && (
          <p role="alert" className="rounded-control bg-danger-tint px-4 py-3 text-sm font-semibold text-danger">
            Please fix {errorCount} field{errorCount === 1 ? "" : "s"} below.
          </p>
        )}

        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-4 font-display text-xl font-bold">Contact details</legend>
          <div className="sm:col-span-2">
            <TextField id="fullName" label="Full name" autoComplete="name" value={form.fullName} error={errors.fullName} onChange={(e) => updateField("fullName", e.target.value)} />
          </div>
          <TextField id="email" label="Email" type="email" autoComplete="email" value={form.email} error={errors.email} onChange={(e) => updateField("email", e.target.value)} />
          <TextField
            id="phone"
            label="Mobile number"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={10}
            hint="10 digits, without +91"
            value={form.phone}
            error={errors.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </fieldset>

        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-4 font-display text-xl font-bold">Delivery address</legend>
          <div className="sm:col-span-2">
            <TextAreaField
              id="address"
              label="Address"
              autoComplete="street-address"
              rows={3}
              className="min-h-0"
              value={form.address}
              error={errors.address}
              onChange={(e) => updateField("address", e.target.value)}
            />
          </div>
          <TextField id="city" label="City" autoComplete="address-level2" value={form.city} error={errors.city} onChange={(e) => updateField("city", e.target.value)} />
          <TextField
            id="pincode"
            label="PIN code"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={6}
            value={form.pincode}
            error={errors.pincode}
            onChange={(e) => updateField("pincode", e.target.value)}
          />
        </fieldset>

        <Button type="submit" size="lg" fullWidth>
          Place demo order for {formatPrice(cart.total)}
        </Button>
      </form>

      <div className="lg:sticky lg:top-24">
        <OrderSummary itemCount={cart.itemCount} subtotal={cart.subtotal} shipping={cart.shipping} total={cart.total}>
          <ul className="mt-4 divide-y divide-line border-y border-line text-sm">
            {cart.lines.map((line) => (
              <li key={line.product.id} className="flex justify-between gap-3 py-2.5">
                <span className="min-w-0">
                  {line.product.name} <span className="text-ink-soft">× {line.quantity}</span>
                </span>
                <span className="shrink-0 font-semibold tabular-nums">{formatPrice(line.lineTotal)}</span>
              </li>
            ))}
          </ul>
        </OrderSummary>
      </div>
    </div>
  );
}
