import type { CartItem, Product } from "@/types";

// Pure functions for cart maths. "Pure" means they only use their inputs,
// which makes them easy to understand and to test.

export const FREE_SHIPPING_FROM = 999;
export const SHIPPING_FEE = 79;
export const MAX_QUANTITY_PER_ITEM = 10;

/** A cart item joined with its product details. */
export interface CartLine {
  product: Product;
  quantity: number;
  lineTotal: number;
  /** A message when this line can't be bought as it is (e.g. out of stock). */
  problem?: string;
}

export interface CartSummary {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  /** True when at least one line has a problem, so checkout should be blocked. */
  hasProblems: boolean;
}

/** Highest quantity a customer can choose for a product. */
export function maxQuantityFor(product: Product): number {
  return Math.min(product.stock, MAX_QUANTITY_PER_ITEM);
}

/**
 * Turns the saved cart (ids + quantities) into lines with prices and totals.
 * Products that were deleted by the admin are skipped.
 */
export function summariseCart(items: CartItem[], products: Product[]): CartSummary {
  const lines: CartLine[] = [];

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue; // product no longer exists
    let problem: string | undefined;
    if (product.stock === 0) problem = "Out of stock. Remove it to continue.";
    else if (item.quantity > product.stock) problem = `Only ${product.stock} left. Lower the quantity.`;

    lines.push({ product, quantity: item.quantity, lineTotal: product.price * item.quantity, problem });
  }

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;

  const hasProblems = lines.some((line) => line.problem !== undefined);

  return { lines, itemCount, subtotal, shipping, total: subtotal + shipping, hasProblems };
}
