import type { Metadata } from "next";
import ProductsBrowser from "@/components/products/ProductsBrowser";
import PageHeader from "@/components/ui/PageHeader";
import { CATEGORIES } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Search, filter and sort every product in the Nexora store.",
};

interface ProductsPageProps {
  // In Next.js 15+ searchParams is a Promise, so we await it.
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams;
  const initialCategory = CATEGORIES.find((name) => name === category) ?? "All";

  return (
    <div className="container-page">
      <PageHeader title="All products" description="Search by name, narrow down by category, and sort by price." />
      {/* The key resets the filters when a different category link is opened */}
      <ProductsBrowser key={initialCategory} initialCategory={initialCategory} />
    </div>
  );
}
