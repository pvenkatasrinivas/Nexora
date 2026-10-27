"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { maxQuantityFor } from "@/lib/cart";
import type { Product } from "@/types";

// Adds a product to the cart and briefly shows "Added to cart" as feedback.

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function AddToCartButton({ product, quantity = 1, size = "md", fullWidth = false }: AddToCartButtonProps) {
  const { addToCart, getQuantityInCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  // Hide the "Added" message again after 2 seconds.
  useEffect(() => {
    if (!justAdded) return;
    const timer = setTimeout(() => setJustAdded(false), 2000);
    return () => clearTimeout(timer);
  }, [justAdded]);

  const outOfStock = product.stock === 0;
  const reachedLimit = getQuantityInCart(product.id) >= maxQuantityFor(product);

  let label = "Add to cart";
  if (outOfStock) label = "Out of stock";
  else if (reachedLimit) label = "Maximum in cart";
  else if (justAdded) label = "Added to cart";

  return (
    <>
      <Button
        size={size}
        fullWidth={fullWidth}
        variant={justAdded ? "accent" : "primary"}
        disabled={outOfStock || reachedLimit}
        onClick={() => {
          addToCart(product.id, quantity);
          setJustAdded(true);
        }}
      >
        {label}
      </Button>
      {/* Screen readers hear the confirmation too */}
      <span className="sr-only" aria-live="polite">
        {justAdded ? `${product.name} added to cart` : ""}
      </span>
    </>
  );
}
