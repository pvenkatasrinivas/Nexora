import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/bricolage-grotesque";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Providers from "@/components/layout/Providers";

// The root layout wraps every page: navbar on top, footer at the bottom.

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Nexora — Responsive E-Commerce Website",
    template: "%s | Nexora",
  },
  description: "Shop electronics, fashion, home, beauty, sports and books on Nexora, a responsive e-commerce demo.",
};

export const viewport: Viewport = {
  themeColor: "#2b2d8a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body className="flex min-h-screen flex-col">
        {/* Lets keyboard users jump past the navigation */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-white focus:px-4 focus:py-2 focus:font-semibold"
        >
          Skip to main content
        </a>
        <Providers>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
