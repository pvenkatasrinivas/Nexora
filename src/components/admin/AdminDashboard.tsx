"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import DemoNotice from "@/components/ui/DemoNotice";
import EmptyState from "@/components/ui/EmptyState";
import { useProducts } from "@/context/ProductContext";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

// What the form area is doing right now.
type FormMode = { type: "closed" } | { type: "add" } | { type: "edit"; product: Product };

// What the confirmation dialog is asking about.
type PendingAction = { type: "delete"; product: Product } | { type: "reset" } | null;

export default function AdminDashboard() {
  const { products, isLoaded, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();
  const [formMode, setFormMode] = useState<FormMode>({ type: "closed" });
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [message, setMessage] = useState("");

  // When the form opens, move focus to its heading so keyboard and
  // screen-reader users land in the right place.
  useEffect(() => {
    if (formMode.type !== "closed") {
      const heading = document.getElementById("product-form-heading");
      heading?.focus();
      heading?.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, [formMode]);

  function handleSave(values: Omit<Product, "id">) {
    if (formMode.type === "edit") {
      updateProduct(formMode.product.id, values);
      setMessage(`Saved changes to “${values.name}”.`);
    } else {
      addProduct(values);
      setMessage(`Added “${values.name}”.`);
    }
    setFormMode({ type: "closed" });
  }

  function handleConfirm() {
    if (pendingAction?.type === "delete") {
      deleteProduct(pendingAction.product.id);
      setMessage(`Deleted “${pendingAction.product.name}”.`);
    } else if (pendingAction?.type === "reset") {
      resetProducts();
      setFormMode({ type: "closed" });
      setMessage("Restored the original sample products.");
    }
    setPendingAction(null);
  }

  // Wait for saved products so the admin never edits the sample list by mistake.
  if (!isLoaded) {
    return <p className="py-10 text-ink-soft">Loading products…</p>;
  }

  // Simple numbers for the summary cards.
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const stockValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const stats = [
    { label: "Products", value: String(products.length) },
    { label: "Out of stock", value: String(outOfStock) },
    { label: "Low stock (5 or fewer)", value: String(lowStock) },
    { label: "Value of stock", value: formatPrice(stockValue) },
  ];

  return (
    <div className="flex flex-col gap-8">
      <DemoNotice>
        <strong>Learning demo.</strong> This admin page has no login, so anyone who opens it can make changes. Changes are saved only in
        this browser’s localStorage, not in a database.
      </DemoNotice>

      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-card border border-line bg-white p-4">
            <dt className="text-sm text-ink-soft">{stat.label}</dt>
            <dd className="mt-1 font-display text-2xl font-bold tabular-nums sm:text-3xl">{stat.value}</dd>
          </div>
        ))}
      </dl>

      {/* Success messages are announced to screen readers */}
      <div aria-live="polite">
        {message && (
          <p className="flex items-center justify-between gap-3 rounded-control bg-success-tint px-4 py-3 text-sm font-semibold text-success">
            {message}
            <button type="button" className="min-h-11 px-2 text-ink-soft hover:text-ink" onClick={() => setMessage("")} aria-label="Dismiss message">
              ✕
            </button>
          </p>
        )}
      </div>

      {formMode.type !== "closed" && (
        <ProductForm
          // A new key gives a fresh form each time we switch product.
          key={formMode.type === "edit" ? formMode.product.id : "new"}
          product={formMode.type === "edit" ? formMode.product : undefined}
          onSave={handleSave}
          onCancel={() => setFormMode({ type: "closed" })}
        />
      )}

      <section aria-labelledby="products-heading">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 id="products-heading" className="text-2xl font-bold">
            Products
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => setPendingAction({ type: "reset" })}>
              Restore sample data
            </Button>
            <Button
              onClick={() => {
                setMessage("");
                setFormMode({ type: "add" });
              }}
            >
              Add product
            </Button>
          </div>
        </div>

        {products.length > 0 ? (
          <ProductTable
            products={products}
            onEdit={(product) => {
              setMessage("");
              setFormMode({ type: "edit", product });
            }}
            onDelete={(product) => setPendingAction({ type: "delete", product })}
          />
        ) : (
          <EmptyState
            title="No products yet"
            message="Add your first product, or restore the sample data to start again."
            action={<Button onClick={() => setFormMode({ type: "add" })}>Add product</Button>}
          />
        )}
      </section>

      <ConfirmDialog
        open={pendingAction !== null}
        title={pendingAction?.type === "reset" ? "Restore sample data?" : `Delete “${pendingAction?.type === "delete" ? pendingAction.product.name : ""}”?`}
        message={
          pendingAction?.type === "reset"
            ? "All products will be replaced with the original 16 sample products. Products you added will be removed."
            : "The product will be removed from the store and from shopping carts. This can’t be undone."
        }
        confirmLabel={pendingAction?.type === "reset" ? "Restore samples" : "Delete product"}
        onConfirm={handleConfirm}
        onCancel={() => setPendingAction(null)}
      />
    </div>
  );
}
