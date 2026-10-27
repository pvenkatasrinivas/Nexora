import type { Metadata } from "next";
import ProductDetails from "@/components/products/ProductDetails";
import { SAMPLE_PRODUCTS } from "@/data/products";

interface ProductPageProps {
  // The [id] folder name becomes a route parameter: /products/p1 -> id = "p1".
  params: Promise<{ id: string }>;
}

// Pre-build a page for every sample product at build time (faster to load).
// Products added on the admin page still work: Next.js renders those on request.
export function generateStaticParams() {
  return SAMPLE_PRODUCTS.map((product) => ({ id: product.id }));
}

// Page title for the browser tab. Products added on the admin page only exist
// in the browser, so for those we fall back to a general title.
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = SAMPLE_PRODUCTS.find((p) => p.id === id);
  return product ? { title: product.name, description: product.description } : { title: "Product" };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return <ProductDetails productId={id} />;
}
