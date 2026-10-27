"use client";

import Link from "next/link";
import ProductImage from "@/components/products/ProductImage";
import QuantitySelector from "@/components/ui/QuantitySelector";
import { useCart } from "@/context/CartContext";
import { maxQuantityFor, type CartLine } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

// One product in the cart, with quantity controls and a remove button.

export default function CartItemRow({ line }: { line: CartLine }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, lineTotal, problem } = line;

  return (
    <li className="flex gap-4 py-5">
      <Link href={`/products/${product.id}`} className="w-20 shrink-0 overflow-hidden rounded-control sm:w-28">
        <ProductImage icon={product.icon} color={product.color} />
        <span className="sr-only">{product.name}</span>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="font-sans text-base font-semibold">
            <Link href={`/products/${product.id}`} className="hover:text-brand lg:py-0 py-2.5 inline-block">
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm text-ink-soft">{formatPrice(product.price)} each</p>
          {problem && <p className="mt-1 text-sm font-semibold text-danger">{problem}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:flex-col sm:items-end">
          <QuantitySelector
            size="sm"
            value={quantity}
            max={Math.max(maxQuantityFor(product), 1)}
            onChange={(newQuantity) => updateQuantity(product.id, newQuantity)}
            itemName={product.name}
          />
          <p className="font-bold tabular-nums">{formatPrice(lineTotal)}</p>
          <button
            type="button"
            onClick={() => removeFromCart(product.id)}
            className="min-h-11 rounded-control text-sm font-semibold text-danger underline-offset-2 hover:underline lg:min-h-0"
            aria-label={`Remove ${product.name} from cart`}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
