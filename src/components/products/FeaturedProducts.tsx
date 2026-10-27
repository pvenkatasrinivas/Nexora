"use client";

import { useProducts } from "@/context/ProductContext";
import ProductGrid from "./ProductGrid";

// Featured products for the home page. This is a client component because
// products can be changed on the admin page and are read from the context.

export default function FeaturedProducts({ limit = 8 }: { limit?: number }) {
  const { products } = useProducts();
  const featured = products.filter((product) => product.featured).slice(0, limit);

  if (featured.length === 0) {
    return <p className="text-ink-soft">No featured products right now. Mark some as featured on the admin page.</p>;
  }
  return <ProductGrid products={featured} />;
}
