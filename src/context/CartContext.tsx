"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { maxQuantityFor, summariseCart, type CartSummary } from "@/lib/cart";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "@/lib/storage";
import type { CartItem } from "@/types";
import { useProducts } from "./ProductContext";

// CartContext keeps the shopping cart. Because it wraps the whole app
// (see app/layout.tsx) the cart stays the same while moving between pages,
// and localStorage keeps it after a page refresh.

interface CartContextValue extends CartSummary {
  isLoaded: boolean;
  addToCart: (productId: string, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getQuantityInCart: (productId: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { products } = useProducts();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage is only possible after mount
    setItems(loadFromStorage<CartItem[]>(STORAGE_KEYS.cart, []));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) saveToStorage(STORAGE_KEYS.cart, items);
  }, [items, isLoaded]);

  /** Keeps a quantity between 1 and the most we allow for that product. */
  const clampQuantity = useCallback(
    (productId: string, quantity: number) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return 0;
      return Math.max(1, Math.min(Math.floor(quantity), maxQuantityFor(product)));
    },
    [products],
  );

  const addToCart = useCallback(
    (productId: string, quantity: number) => {
      setItems((current) => {
        const existing = current.find((item) => item.productId === productId);
        if (existing) {
          // Already in the cart: add to the quantity instead of adding a second line.
          return current.map((item) =>
            item.productId === productId
              ? { ...item, quantity: clampQuantity(productId, item.quantity + quantity) }
              : item,
          );
        }
        return [...current, { productId, quantity: clampQuantity(productId, quantity) }];
      });
    },
    [clampQuantity],
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      setItems((current) =>
        current.map((item) =>
          item.productId === productId ? { ...item, quantity: clampQuantity(productId, quantity) } : item,
        ),
      );
    },
    [clampQuantity],
  );

  const removeFromCart = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getQuantityInCart = useCallback(
    (productId: string) => items.find((item) => item.productId === productId)?.quantity ?? 0,
    [items],
  );

  // Recalculate totals whenever the cart or the product prices change.
  const summary = useMemo(() => summariseCart(items, products), [items, products]);

  const value = useMemo(
    () => ({ ...summary, isLoaded, addToCart, updateQuantity, removeFromCart, clearCart, getQuantityInCart }),
    [summary, isLoaded, addToCart, updateQuantity, removeFromCart, clearCart, getQuantityInCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
