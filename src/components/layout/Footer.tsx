import Link from "next/link";
import { CATEGORIES } from "@/data/products";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-20 bg-brand-dark text-white">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo onDark />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
            A responsive e-commerce demo built with Next.js, React, TypeScript and Tailwind CSS. Orders and payments here are not real.
          </p>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold text-white">Shop by category</h2>
          <ul className="mt-2 text-sm">
            {CATEGORIES.map((category) => (
              <li key={category}>
                <Link
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className="inline-flex min-h-11 items-center text-white/75 hover:text-white focus-visible:outline-marigold"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold text-white">Your account</h2>
          <ul className="mt-2 text-sm">
            {[
              { href: "/cart", label: "Shopping cart" },
              { href: "/checkout", label: "Checkout" },
              { href: "/admin", label: "Admin dashboard (demo)" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-11 items-center text-white/75 hover:text-white focus-visible:outline-marigold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="container-page py-5 text-xs text-white/70">© {new Date().getFullYear()} Nexora. A portfolio project.</p>
      </div>
    </footer>
  );
}
