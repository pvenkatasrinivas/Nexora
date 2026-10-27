import Link from "next/link";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import ProductImage from "@/components/products/ProductImage";
import { ButtonLink } from "@/components/ui/Button";
import { CATEGORIES, CATEGORY_DETAILS } from "@/data/products";
import { FREE_SHIPPING_FROM, SHIPPING_FEE } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

// The home page is a Server Component: it has no state of its own,
// so it is rendered to HTML on the server. Only FeaturedProducts runs in the browser.

/** Four drawings arranged like a shop shelf next to the hero text. */
const HERO_TILES = [
  { icon: "headphones", color: "#2B2D8A", className: "col-span-2 row-span-2" },
  { icon: "mug", color: "#B23A2E", className: "aspect-square" },
  { icon: "plant", color: "#1F7A5C", className: "aspect-square" },
  { icon: "sneaker", color: "#C98A00", className: "col-span-2" },
] as const;

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-white">
        <div className="container-page grid items-center gap-10 py-12 md:grid-cols-2 md:py-16 lg:gap-16 lg:py-20">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Everyday things, without the endless scrolling.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
              A short, well-chosen list of electronics, clothes, home goods and books. Free delivery on orders over{" "}
              {formatPrice(FREE_SHIPPING_FROM)}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/products" size="lg">
                Browse all products
              </ButtonLink>
              <ButtonLink href="#featured" size="lg" variant="secondary">
                See featured picks
              </ButtonLink>
            </div>
          </div>

          {/* Decorative picture grid: 4 columns, the big tile covers 2 x 2 cells */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4" aria-hidden="true">
            {HERO_TILES.map((tile) => (
              <div key={tile.icon} className={`overflow-hidden rounded-card ${tile.className}`}>
                <ProductImage icon={tile.icon} color={tile.color} cover />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page pt-14 sm:pt-16" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="text-2xl font-bold sm:text-3xl">
          Shop by category
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {CATEGORIES.map((category) => {
            const details = CATEGORY_DETAILS[category];
            return (
              <li key={category}>
                <Link
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-white transition-colors hover:border-brand"
                >
                  <div className="h-24 overflow-hidden sm:h-28">
                    <ProductImage icon={details.icon} color={details.color} cover />
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-ink">{category}</p>
                    <p className="mt-0.5 text-xs leading-snug text-ink-soft">{details.blurb}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Featured products */}
      <section id="featured" className="container-page scroll-mt-24 pt-14 sm:pt-16" aria-labelledby="featured-heading">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <h2 id="featured-heading" className="text-2xl font-bold sm:text-3xl">
            Featured products
          </h2>
          <Link href="/products" className="inline-flex min-h-11 items-center rounded-control text-sm font-semibold text-brand hover:underline">
            View all products
          </Link>
        </div>
        <FeaturedProducts />
      </section>

      {/* Promotion */}
      <section className="container-page pt-14 sm:pt-16">
        <div className="flex flex-col gap-6 rounded-card bg-marigold px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-10">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Free delivery over {formatPrice(FREE_SHIPPING_FROM)}</h2>
            <p className="mt-2 max-w-xl text-ink">
              Smaller orders have a flat {formatPrice(SHIPPING_FEE)} delivery fee. Your cart shows how much more you need for free delivery.
            </p>
          </div>
          <ButtonLink href="/products" size="lg" variant="dark" className="shrink-0">
            Start shopping
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
