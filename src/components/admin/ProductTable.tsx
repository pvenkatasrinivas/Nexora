import Link from "next/link";
import ProductImage from "@/components/products/ProductImage";
import Button from "@/components/ui/Button";
import StockBadge from "@/components/ui/StockBadge";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";

// The admin product list. On laptops and desktops it's a table; on phones and
// tablets each product becomes a small card, because wide tables don't fit small screens.

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function Actions({ product, onEdit, onDelete }: { product: Product } & Omit<ProductTableProps, "products">) {
  return (
    <div className="flex gap-2">
      <Button variant="secondary" size="sm" onClick={() => onEdit(product)} aria-label={`Edit ${product.name}`}>
        Edit
      </Button>
      <Button variant="ghost" size="sm" className="text-danger hover:bg-danger-tint" onClick={() => onDelete(product)} aria-label={`Delete ${product.name}`}>
        Delete
      </Button>
    </div>
  );
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <>
      {/* Table for laptops and larger */}
      <div className="hidden overflow-x-auto rounded-card border border-line bg-white lg:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">All products</caption>
          <thead className="border-b border-line bg-paper text-ink-soft">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Product</th>
              <th scope="col" className="px-4 py-3 font-semibold">Category</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">Price</th>
              <th scope="col" className="px-4 py-3 font-semibold">Stock</th>
              <th scope="col" className="px-4 py-3 font-semibold">Featured</th>
              <th scope="col" className="px-4 py-3 font-semibold"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 shrink-0 overflow-hidden rounded-md">
                      <ProductImage icon={product.icon} color={product.color} />
                    </div>
                    <Link href={`/products/${product.id}`} className="inline-block py-2.5 font-semibold hover:text-brand lg:py-0">
                      {product.name}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-soft">{product.category}</td>
                <td className="px-4 py-3 text-right font-semibold tabular-nums">{formatPrice(product.price)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 tabular-nums">{product.stock}</span>
                    <StockBadge stock={product.stock} />
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-soft">{product.featured ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <Actions product={product} onEdit={onEdit} onDelete={onDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for phones (1 column) and tablets (2 columns) */}
      <ul className="grid gap-3 md:grid-cols-2 lg:hidden">
        {products.map((product) => (
          <li key={product.id} className="rounded-card border border-line bg-white p-4">
            <div className="flex gap-3">
              <div className="w-16 shrink-0 overflow-hidden rounded-control">
                <ProductImage icon={product.icon} color={product.color} />
              </div>
              <div className="min-w-0 flex-1">
                <Link href={`/products/${product.id}`} className="inline-block py-2.5 font-semibold hover:text-brand lg:py-0">
                  {product.name}
                </Link>
                <p className="text-sm text-ink-soft">
                  {product.category}
                  {product.featured ? ", featured" : ""}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="font-bold tabular-nums">{formatPrice(product.price)}</span>
                  <StockBadge stock={product.stock} />
                  <span className="text-xs text-ink-soft">{product.stock} units</span>
                </div>
              </div>
            </div>
            <div className="mt-3 border-t border-line pt-3">
              <Actions product={product} onEdit={onEdit} onDelete={onDelete} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
