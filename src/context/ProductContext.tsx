"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SAMPLE_PRODUCTS } from "@/data/products";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "@/lib/storage";
import type { Product } from "@/types";

// ProductContext holds the list of products for the whole app.
// The admin page changes it; every other page reads from it.

interface ProductContextValue {
  products: Product[];
  /** False until saved products have been read from localStorage. */
  isLoaded: boolean;
  getProduct: (id: string) => Product | undefined;
  addProduct: (product: Omit<Product, "id">) => Product;
  updateProduct: (id: string, changes: Partial<Omit<Product, "id">>) => void;
  deleteProduct: (id: string) => void;
  resetProducts: () => void;
}

const ProductContext = createContext<ProductContextValue | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  // Start with the sample data so the server and browser render the same HTML.
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [isLoaded, setIsLoaded] = useState(false);

  // After the page loads in the browser, replace the samples with any saved products.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage is only possible after mount
    setProducts(loadFromStorage(STORAGE_KEYS.products, SAMPLE_PRODUCTS));
    setIsLoaded(true);
  }, []);

  // Save every change. We wait for isLoaded so we never overwrite saved data with the samples.
  useEffect(() => {
    if (isLoaded) saveToStorage(STORAGE_KEYS.products, products);
  }, [products, isLoaded]);

  const getProduct = useCallback((id: string) => products.find((p) => p.id === id), [products]);

  const addProduct = useCallback((product: Omit<Product, "id">) => {
    const newProduct: Product = { ...product, id: `p${Date.now()}` };
    setProducts((current) => [newProduct, ...current]);
    return newProduct;
  }, []);

  const updateProduct = useCallback((id: string, changes: Partial<Omit<Product, "id">>) => {
    setProducts((current) => current.map((p) => (p.id === id ? { ...p, ...changes } : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((current) => current.filter((p) => p.id !== id));
  }, []);

  const resetProducts = useCallback(() => setProducts(SAMPLE_PRODUCTS), []);

  const value = useMemo(
    () => ({ products, isLoaded, getProduct, addProduct, updateProduct, deleteProduct, resetProducts }),
    [products, isLoaded, getProduct, addProduct, updateProduct, deleteProduct, resetProducts],
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

/** Use this hook in any component that needs the products. */
export function useProducts(): ProductContextValue {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used inside <ProductProvider>");
  return context;
}
