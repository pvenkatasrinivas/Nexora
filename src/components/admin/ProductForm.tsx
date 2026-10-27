"use client";

import { useState, type FormEvent } from "react";
import ProductImage from "@/components/products/ProductImage";
import Button from "@/components/ui/Button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/FormField";
import { CATEGORIES, PRODUCT_COLORS, PRODUCT_ICONS } from "@/data/products";
import { hasErrors, validateProduct, type ProductFormValues } from "@/lib/validation";
import type { Category, FormErrors, Product, ProductIcon } from "@/types";

// The add / edit product form on the admin page.

interface ProductFormProps {
  /** Pass a product to edit it; leave empty to add a new one. */
  product?: Product;
  onSave: (product: Omit<Product, "id">) => void;
  onCancel: () => void;
}

/** Turns a product into form values (numbers become strings while editing). */
function toFormValues(product?: Product): ProductFormValues {
  return {
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product ? String(product.price) : "",
    category: product?.category ?? "",
    stock: product ? String(product.stock) : "",
    icon: product?.icon ?? "headphones",
    color: product?.color ?? PRODUCT_COLORS[0].value,
    featured: product?.featured ?? false,
  };
}

const FIELD_ORDER: (keyof ProductFormValues)[] = ["name", "description", "price", "stock", "category"];

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [values, setValues] = useState<ProductFormValues>(() => toFormValues(product));
  const [errors, setErrors] = useState<FormErrors<ProductFormValues>>({});
  const isEditing = product !== undefined;

  function update<K extends keyof ProductFormValues>(field: K, value: ProductFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newErrors = validateProduct(values);
    if (hasErrors(newErrors)) {
      setErrors(newErrors);
      const firstInvalid = FIELD_ORDER.find((field) => newErrors[field]);
      if (firstInvalid) document.getElementById(`product-${firstInvalid}`)?.focus();
      return;
    }

    onSave({
      name: values.name.trim(),
      description: values.description.trim(),
      price: Number(values.price),
      stock: Number(values.stock),
      category: values.category as Category,
      icon: values.icon as ProductIcon,
      color: values.color,
      featured: values.featured,
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-card border border-brand/30 bg-white p-5 sm:p-6" aria-labelledby="product-form-heading">
      <h2 id="product-form-heading" tabIndex={-1} className="text-2xl font-bold">
        {isEditing ? `Edit “${product.name}”` : "Add a new product"}
      </h2>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_16rem]">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TextField id="product-name" label="Product name" value={values.name} error={errors.name} onChange={(e) => update("name", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <TextAreaField
              id="product-description"
              label="Description"
              value={values.description}
              error={errors.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>
          <TextField
            id="product-price"
            label="Price (₹)"
            inputMode="numeric"
            value={values.price}
            error={errors.price}
            onChange={(e) => update("price", e.target.value)}
          />
          <TextField
            id="product-stock"
            label="Units in stock"
            inputMode="numeric"
            value={values.stock}
            error={errors.stock}
            onChange={(e) => update("stock", e.target.value)}
          />
          <SelectField id="product-category" label="Category" value={values.category} error={errors.category} onChange={(e) => update("category", e.target.value)}>
            <option value="">Choose a category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </SelectField>
          <SelectField id="product-icon" label="Picture" value={values.icon} onChange={(e) => update("icon", e.target.value)}>
            {PRODUCT_ICONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon.charAt(0).toUpperCase() + icon.slice(1)}
              </option>
            ))}
          </SelectField>

          <fieldset className="sm:col-span-2">
            <legend className="text-sm font-semibold">Picture colour</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {PRODUCT_COLORS.map((color) => (
                <label
                  key={color.value}
                  className="flex min-h-11 cursor-pointer items-center gap-2 rounded-control border border-line px-3 text-sm has-[:checked]:border-brand has-[:checked]:bg-brand-tint has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-brand"
                >
                  <input
                    type="radio"
                    name="product-color"
                    value={color.value}
                    checked={values.color === color.value}
                    onChange={() => update("color", color.value)}
                    className="sr-only"
                  />
                  <span className="h-4 w-4 rounded-full" style={{ backgroundColor: color.value }} aria-hidden="true" />
                  {color.name}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="flex min-h-11 items-center gap-3 text-sm font-semibold sm:col-span-2">
            <input
              type="checkbox"
              checked={values.featured}
              onChange={(e) => update("featured", e.target.checked)}
              className="h-5 w-5 accent-brand"
            />
            Show on the home page as a featured product
          </label>
        </div>

        {/* Live preview so the admin can see the picture before saving */}
        <div>
          <p className="text-sm font-semibold">Preview</p>
          <div className="mt-2 max-w-48 overflow-hidden rounded-card border border-line lg:max-w-none">
            <ProductImage icon={values.icon as ProductIcon} color={values.color} label={`Preview of ${values.name || "new product"}`} />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-5 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isEditing ? "Save changes" : "Add product"}</Button>
      </div>
    </form>
  );
}
