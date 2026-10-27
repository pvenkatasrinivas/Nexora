"use client";

import Link from "next/link";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import QuantitySelector from "@/components/ui/QuantitySelector";
import StockBadge from "@/components/ui/StockBadge";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { FREE_SHIPPING_FROM, maxQuantityFor } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import AddToCartButton from "./AddToCartButton";
import ProductGrid from "./ProductGrid";
import ProductImage from "./ProductImage";

export default function ProductDetails({ productId }: { productId: string }) {
  const { products, getProduct, isLoaded } = useProducts();
  const { getQuantityInCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = getProduct(productId);

  if (!product) {
    // Products added by the admin are read from localStorage after the page loads,
    // so wait for that before saying the product doesn't exist.
    if (!isLoaded) {
      return <p className="container-page py-16 text-ink-soft">Loading product…</p>;
    }
    return (
      <div className="container-page py-12">
        <EmptyState
          title="Product not found"
          message="It may have been removed from the store. Have a look at the other products instead."
          action={<ButtonLink href="/products">Browse products</ButtonLink>}
        />
      </div>
    );
  }

  // The most this customer can still add, counting what is already in the cart.
  const canStillAdd = Math.max(0, maxQuantityFor(product) - getQuantityInCart(product.id));
  const chosenQuantity = Math.min(quantity, Math.max(canStillAdd, 1));
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container-page">
      {/* Breadcrumb trail */}
      <nav aria-label="Breadcrumb" className="pt-4 text-sm">
        <ol className="flex flex-wrap items-center gap-x-2 text-ink-soft">
          <li>
            <Link href="/" className="inline-flex min-h-11 items-center hover:text-brand">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="inline-flex min-h-11 items-center hover:text-brand">
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-semibold text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-8 md:grid-cols-2 lg:gap-14">
        <div className="self-start overflow-hidden rounded-card border border-line">
          <ProductImage icon={product.icon} color={product.color} label={product.name} />
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-medium text-ink-soft">{product.category}</p>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
            <StockBadge stock={product.stock} />
          </div>
          <p className="mt-1 text-sm text-ink-soft">Price includes GST.</p>

          <p className="mt-6 max-w-prose leading-relaxed text-ink">{product.description}</p>

          {product.stock > 0 && (
            <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold" id="quantity-label">
                  Quantity
                </span>
                <div role="group" aria-labelledby="quantity-label">
                  <QuantitySelector
                    value={chosenQuantity}
                    max={Math.max(canStillAdd, 1)}
                    onChange={setQuantity}
                    itemName={product.name}
                  />
                </div>
              </div>
              <div className="flex-1 lg:max-w-xs">
                <AddToCartButton product={product} quantity={chosenQuantity} size="lg" fullWidth />
              </div>
            </div>
          )}

          {getQuantityInCart(product.id) > 0 && (
            <p className="mt-3 text-sm text-ink-soft">
              You have {getQuantityInCart(product.id)} in your cart.{" "}
              <Link href="/cart" className="inline-flex min-h-11 items-center font-semibold text-brand underline-offset-2 hover:underline">
                View cart
              </Link>
            </p>
          )}

          <ul className="mt-8 space-y-2 border-t border-line pt-6 text-sm text-ink-soft">
            <li>Free delivery on orders over {formatPrice(FREE_SHIPPING_FROM)}.</li>
            {product.stock > 0 && <li>You can buy up to {maxQuantityFor(product)} of this item per order.</li>}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16" aria-labelledby="related-heading">
          <h2 id="related-heading" className="mb-6 text-2xl font-bold">
            More in {product.category}
          </h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
