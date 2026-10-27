"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { SelectField, TextField } from "@/components/ui/FormField";
import { useProducts } from "@/context/ProductContext";
import { CATEGORIES } from "@/data/products";
import { filterProducts, SORT_OPTIONS, type SortOption } from "@/lib/products";
import type { Category } from "@/types";
import ProductGrid from "./ProductGrid";

interface ProductsBrowserProps {
  /** Category chosen from a link like /products?category=Fashion */
  initialCategory: Category | "All";
}

export default function ProductsBrowser({ initialCategory }: ProductsBrowserProps) {
  const { products } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "All">(initialCategory);
  const [sort, setSort] = useState<SortOption>("featured");

  // useMemo re-runs the filtering only when one of these values changes.
  const visibleProducts = useMemo(
    () => filterProducts(products, { search, category, sort }),
    [products, search, category, sort],
  );

  const hasActiveFilters = search !== "" || category !== "All" || sort !== "featured";

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setSort("featured");
  }

  return (
    <div>
      {/* Filter bar. role="search" helps screen-reader users find it. */}
      <div role="search" className="grid gap-4 rounded-card border border-line bg-white p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto] lg:items-end">
        <div className="sm:col-span-2 lg:col-span-1">
          <TextField
            id="search"
            label="Search products"
            type="search"
            placeholder="Try “headphones” or “mug”"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            autoComplete="off"
          />
        </div>
        <SelectField id="category" label="Category" value={category} onChange={(event) => setCategory(event.target.value as Category | "All")}>
          <option value="All">All categories</option>
          {CATEGORIES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </SelectField>
        <SelectField id="sort" label="Sort by" value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
        <Button variant="secondary" onClick={clearFilters} disabled={!hasActiveFilters} className="sm:col-span-2 lg:col-span-1">
          Clear filters
        </Button>
      </div>

      <h2 className="mt-8 mb-4 font-sans text-sm font-semibold text-ink-soft" aria-live="polite">
        Showing {visibleProducts.length} of {products.length} products
      </h2>

      {visibleProducts.length > 0 ? (
        <ProductGrid products={visibleProducts} />
      ) : (
        <EmptyState
          title="No products match your search"
          message="Check the spelling, pick another category, or clear the filters to see everything."
          action={<Button onClick={clearFilters}>Clear filters</Button>}
        />
      )}
    </div>
  );
}
