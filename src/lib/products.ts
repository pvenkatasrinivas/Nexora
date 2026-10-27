import type { Category, Product } from "@/types";

// Search, filter and sort logic for the products page.

export type SortOption = "featured" | "price-low" | "price-high" | "name";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured first" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "name", label: "Name: A to Z" },
];

export interface ProductFilters {
  search: string;
  category: Category | "All";
  sort: SortOption;
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  const searchText = filters.search.trim().toLowerCase();

  // 1. Keep only products that match the search text and the category.
  const matching = products.filter((product) => {
    const matchesSearch = searchText === "" || product.name.toLowerCase().includes(searchText);
    const matchesCategory = filters.category === "All" || product.category === filters.category;
    return matchesSearch && matchesCategory;
  });

  // 2. Sort a copy (sort() changes the array it is called on).
  return [...matching].sort((a, b) => {
    switch (filters.sort) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "featured":
        // Featured products first; otherwise keep the original order.
        return Number(b.featured) - Number(a.featured);
    }
  });
}
