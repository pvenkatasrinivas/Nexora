import Link from "next/link";
import StockBadge from "@/components/ui/StockBadge";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";
import AddToCartButton from "./AddToCartButton";
import ProductImage from "./ProductImage";

// A reusable card used on the home page and the products page.

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-card border border-line bg-white transition-colors hover:border-brand/40">
      <Link href={`/products/${product.id}`} className="flex flex-1 flex-col focus-visible:outline-offset-[-3px]">
        <div className="overflow-hidden">
          <ProductImage
            icon={product.icon}
            color={product.color}
            label={product.name}
            className="transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
          <p className="text-xs font-medium text-ink-soft">{product.category}</p>
          <h3 className="font-sans text-sm font-semibold leading-snug text-ink sm:text-base">{product.name}</h3>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
            <p className="text-base font-bold text-ink sm:text-lg">{formatPrice(product.price)}</p>
            <StockBadge stock={product.stock} />
          </div>
        </div>
      </Link>
      <div className="px-3 pb-3 sm:px-4 sm:pb-4">
        <AddToCartButton product={product} size="sm" fullWidth />
      </div>
    </article>
  );
}
