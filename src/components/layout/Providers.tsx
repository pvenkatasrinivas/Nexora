"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";

// Wraps the app with our two contexts. CartProvider is inside ProductProvider
// because the cart needs product prices to calculate totals.

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ProductProvider>
      <CartProvider>{children}</CartProvider>
    </ProductProvider>
  );
}
