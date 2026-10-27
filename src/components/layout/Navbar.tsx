"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/admin", label: "Admin" },
];

/** True when the link matches the current page (so we can highlight it). */
function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="20" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, isLoaded } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  // Close the mobile menu when the page changes. We remember which page the
  // menu was opened on; if the path is different, the menu counts as closed.
  const [menuPath, setMenuPath] = useState(pathname);
  const isMenuVisible = menuOpen && menuPath === pathname;

  function toggleMenu() {
    setMenuPath(pathname);
    setMenuOpen(!isMenuVisible);
  }

  const cartLabel = isLoaded && itemCount > 0 ? `Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}` : "Cart";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label="Main">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-control px-3 text-sm font-semibold transition-colors ${
                  isActive(pathname, link.href) ? "bg-brand-tint text-brand" : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            aria-label={cartLabel}
            aria-current={pathname === "/cart" ? "page" : undefined}
            className="relative inline-flex min-h-11 items-center gap-2 rounded-control border border-line px-3 text-sm font-semibold text-ink hover:border-brand hover:text-brand"
          >
            <CartIcon />
            <span className="hidden sm:inline">Cart</span>
            {isLoaded && itemCount > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-marigold px-1.5 text-xs font-bold text-ink" aria-hidden="true">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-control border border-line md:hidden"
            aria-expanded={isMenuVisible}
            aria-controls="mobile-menu"
            aria-label={isMenuVisible ? "Close menu" : "Open menu"}
            onClick={toggleMenu}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {isMenuVisible ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile links */}
      {isMenuVisible && (
        <div id="mobile-menu" className="border-t border-line bg-white md:hidden">
          <ul className="container-page flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={`flex min-h-12 items-center rounded-control px-3 font-semibold ${
                    isActive(pathname, link.href) ? "bg-brand-tint text-brand" : "text-ink"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
