import type { CheckoutForm, Order } from "@/types";
import type { CartSummary } from "./cart";

/** Builds a demo order from the checkout form and the current cart. */
export function createOrder(customer: CheckoutForm, cart: CartSummary): Order {
  return {
    // A readable id based on the current time, e.g. "NX-MCK2Q9ZB"
    id: `NX-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    customer: {
      fullName: customer.fullName.trim(),
      email: customer.email.trim(),
      phone: customer.phone.trim(),
      address: customer.address.trim(),
      city: customer.city.trim(),
      pincode: customer.pincode.trim(),
    },
    // Copy name and price now, so the order doesn't change if the admin edits the product later.
    items: cart.lines.map((line) => ({
      productId: line.product.id,
      name: line.product.name,
      price: line.product.price,
      quantity: line.quantity,
    })),
    subtotal: cart.subtotal,
    shipping: cart.shipping,
    total: cart.total,
  };
}
