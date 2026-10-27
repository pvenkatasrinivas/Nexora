import type { Product } from "@/types";
import ProductCard from "./ProductCard";

// Lays out product cards: 2 columns on phones, up to 4 on large screens.

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <li key={product.id} className="flex">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
