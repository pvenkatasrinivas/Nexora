# Nexora — Responsive E-Commerce Website

Nexora is a small online store built with **Next.js, React, TypeScript and Tailwind CSS**. Shoppers can browse and search products, add them to a cart, and place a demo order. A basic admin page lets you add, edit and delete products.

There is no real payment, no login and no database: the cart and product changes are saved in the browser's **localStorage**.

---

## Features

**Shop**

- Responsive navigation bar with a mobile menu and a live cart count
- Home page with a hero section, six product categories, featured products and a promotion banner
- Products page with search by name, category filter, price sorting, and a "Clear filters" button
- A clear message when no products match the search
- Product details page with picture, name, price, stock status, description, quantity selector, Add to cart, and related products
- Shopping cart: increase or decrease quantity, remove items, empty the cart, subtotal, delivery fee and total
- Free delivery on orders of ₹999 or more (otherwise ₹79), with a "add ₹X more" hint
- The cart stays the same while you move between pages and after a page refresh
- Checkout form with validation (name, email, 10-digit mobile number, address, city, 6-digit PIN code)
- Demo order placement and an order confirmation page

**Admin (demo)**

- Product list (a table on laptops, cards on phones and tablets)
- Add, edit and delete products, with form validation and a live picture preview
- Delete asks for confirmation first
- Summary numbers: product count, out-of-stock and low-stock counts, value of stock
- "Restore sample data" to start again

**Quality**

- Works from 320px phones up to large desktop screens with no horizontal scrolling
- Buttons and links are at least 44px tall on phones and tablets so they are easy to tap
- Keyboard friendly: visible focus outline, "Skip to main content" link, labelled form fields, focus moves to the first error
- Product pictures are drawn with SVG, so there are no image files that can break

---

## Technologies used

| Technology | Version | Used for |
| --- | --- | --- |
| Next.js (App Router) | 16.4 | Pages, routing, page titles, production build |
| React | 19.3 | Components, state and context |
| TypeScript | 5.9 | Types for products, cart items, orders and forms |
| Tailwind CSS | 4.3 | All styling and responsive layouts |
| HTML5 / CSS3 | | Semantic elements (`header`, `nav`, `main`, `dialog`, `fieldset`...) and the theme in `globals.css` |
| ESLint | 9 | Code checks (Next.js recommended rules) |
| Fontsource | 5 | The two fonts (Manrope and Bricolage Grotesque), bundled so they work offline |

No other libraries are used. There is no state-management library, form library or UI kit: everything is plain React.

---

## Folder structure

```
Nexora/
├── src/
│   ├── app/                      # Pages (Next.js App Router: one folder = one URL)
│   │   ├── layout.tsx            # Wraps every page: navbar, footer, providers
│   │   ├── globals.css           # Tailwind import + colours, fonts and base styles
│   │   ├── page.tsx              # /                     Home
│   │   ├── products/page.tsx     # /products             Product list
│   │   ├── products/[id]/page.tsx# /products/p1          Product details
│   │   ├── cart/page.tsx         # /cart
│   │   ├── checkout/page.tsx     # /checkout
│   │   ├── order-confirmation/page.tsx
│   │   ├── admin/page.tsx        # /admin                Admin dashboard
│   │   └── not-found.tsx         # 404 page
│   ├── components/
│   │   ├── layout/               # Navbar, Footer, Logo, Providers
│   │   ├── products/             # ProductCard, ProductGrid, ProductImage, ProductsBrowser, ProductDetails...
│   │   ├── cart/                 # CartView, CartItemRow, OrderSummary
│   │   ├── checkout/             # CheckoutView, OrderConfirmation
│   │   ├── admin/                # AdminDashboard, ProductForm, ProductTable
│   │   └── ui/                   # Reusable pieces: Button, FormField, QuantitySelector, EmptyState...
│   ├── context/                  # ProductContext and CartContext (shared state)
│   ├── data/products.ts          # 16 sample products and the category list
│   ├── lib/                      # Plain functions: cart maths, filtering, validation, storage, formatting
│   └── types/index.ts            # TypeScript types
├── .env.example                  # Optional settings (no secrets)
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs            # Connects Tailwind CSS to the build
├── tsconfig.json
└── package.json
```

---

## Getting started

You need **Node.js 20.9 or newer** (Node 22 LTS recommended; `.nvmrc` says 22). Check with `node -v`. Download it from https://nodejs.org if needed.

```bash
# 1. Go into the project folder
cd Nexora

# 2. Install the dependencies
npm install

# 3. Start the development server
npm run dev
```

Open http://localhost:3000 in your browser.

### All commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with live reload |
| `npm run build` | Production build (also checks TypeScript) |
| `npm start` | Runs the production build (run `npm run build` first) |
| `npm run lint` | ESLint checks |
| `npm run typecheck` | TypeScript checks only |
| `npm run check` | Type check + lint + build in one go |

### Environment variables

None are required. `NEXT_PUBLIC_SITE_URL` is optional: set it to your live address (for example `https://nexora.vercel.app`) so page metadata uses the right domain. Copy `.env.example` to `.env.local` to set it locally.

---

## How each feature works

### Pages and routing

Next.js App Router turns folders into URLs. `src/app/products/page.tsx` is `/products`, and `src/app/products/[id]/page.tsx` is `/products/p1`, `/products/p2`, and so on. The `[id]` part is read from `params`.

Each `page.tsx` is a **Server Component**: it sets the page title (`metadata`) and renders a component. Anything that needs clicks, state or localStorage lives in a **Client Component** marked with `"use client"` at the top (for example `ProductsBrowser`, `CartView`, `CheckoutView`). This keeps pages fast while still being interactive.

### Products and the admin page — `ProductContext`

`ProductContext.tsx` keeps the list of products in React state and shares it with every page using React Context.

1. It starts with the sample products from `data/products.ts`.
2. After the page loads in the browser, a `useEffect` reads any saved products from localStorage.
3. Every change (add, edit, delete) updates state, and a second `useEffect` saves the new list back to localStorage.

The admin page calls `addProduct`, `updateProduct` and `deleteProduct`. Because the store and the admin page read the same context, changes show up everywhere straight away.

### Cart — `CartContext`

The cart only stores `{ productId, quantity }` for each item. Prices are always looked up from the current products, so the cart total is never out of date.

- `addToCart` adds a new line, or increases the quantity if the product is already in the cart.
- Quantities are kept between 1 and the smaller of the stock or 10.
- `summariseCart` in `lib/cart.ts` is a pure function that works out each line total, the subtotal, delivery (free from ₹999, otherwise ₹79) and the total. It also flags items that are out of stock, which blocks checkout until they are fixed.
- The provider wraps the whole app in `layout.tsx`, so the cart stays the same while you move between pages, and it is saved to localStorage so it survives a refresh.

### Search, filter and sort

`ProductsBrowser` keeps three pieces of state: `search`, `category` and `sort`. `filterProducts` in `lib/products.ts` first filters (name contains the search text, case-insensitive, and the category matches) and then sorts a copy of the list. `useMemo` re-runs this only when one of those values changes. Category links like `/products?category=Fashion` set the starting category.

### Checkout and validation

`CheckoutView` stores the form values in state. On submit, `validateCheckout` (in `lib/validation.ts`) returns an object of error messages, for example `{ phone: "Enter a 10-digit mobile number." }`. If there are errors they are shown under each field and the cursor moves to the first one. If the form is valid:

1. `createOrder` builds an order with an id like `NX-MCK2Q9ZB`, copying names and prices so the order doesn't change later.
2. Product stock is reduced.
3. The order is saved to localStorage and the cart is emptied.
4. The user is sent to `/order-confirmation`, which reads the saved order and shows it.

No payment details are ever asked for. The page clearly says it is a demo.

### Product pictures — `ProductImage`

Each product has an `icon` (like `"headphones"`) and a `color`. `ProductImage` draws the icon with SVG shapes on that colour. There are no image files to download, nothing can show as a broken image, and pictures stay sharp at any size.

### Responsive design

Tailwind is mobile-first: classes without a prefix apply to phones, and `sm:` (640px), `md:` (768px) and `lg:` (1024px) add changes for bigger screens. Examples:

- Product grid: 2 columns on phones, 3 on laptops (`lg:grid-cols-3`), 4 on wide screens (`xl:grid-cols-4`).
- The navbar shows a menu button on phones and full links from `md:` up.
- Cart and checkout put the order summary under the form on phones and beside it from `lg:` up.
- The admin list is cards on phones and tablets and a table from `lg:` up, because wide tables don't fit on small screens.

---

## Main components

- **`layout.tsx`** — The frame around every page. It loads the fonts and styles, then wraps the page in `Providers` (the two contexts), with `Navbar` above and `Footer` below.
- **`Providers`** — Puts `ProductProvider` around `CartProvider`. The order matters: the cart needs product prices.
- **`ProductContext` / `CartContext`** — Shared state with `createContext` + `useState`. A custom hook (`useProducts()`, `useCart()`) gives any component access. `useEffect` loads from and saves to localStorage.
- **`ProductCard`** — Reusable card used on the home page, product list and related products. Shows picture, category, name, price, stock badge and an `AddToCartButton`.
- **`AddToCartButton`** — Calls `addToCart`, then shows "Added to cart" for 2 seconds (a `useEffect` with `setTimeout`, cleaned up with `clearTimeout`). It disables itself when the item is out of stock or the cart already has the maximum.
- **`ProductsBrowser`** — The products page logic: three state values, `useMemo` filtering, and an empty state when nothing matches.
- **`QuantitySelector`** — A small controlled component: the parent passes `value` and `onChange`, and the − and + buttons disable at the limits.
- **`OrderSummary`** — Shows subtotal, delivery and total. Reused on the cart, checkout and confirmation pages.
- **`FormField` (`TextField`, `SelectField`, `TextAreaField`)** — Inputs with a connected label and error message (`htmlFor`/`id` and `aria-describedby`) so screen readers read both.
- **`ProductForm`** — The admin form. Numbers are kept as strings while typing, then validated and converted with `Number()` on save. The same form handles "add" and "edit".
- **`ConfirmDialog`** — Uses the native HTML `<dialog>` element. `showModal()` gives focus trapping and the Esc key without any library.

---

## How it was tested

Before packaging, the project was checked with:

- `npm run typecheck` — no TypeScript errors
- `npm run lint` — no ESLint errors or warnings
- `npm run build` — production build succeeds

The production build was also tested in a real Chromium browser with an automated script (kept outside this project, so no test library is added as a dependency). It covered search, category filter, sorting, combined filters, the empty-results message, add to cart, quantity limits, cart totals and the free-delivery rule, cart persistence across pages and refresh, checkout validation errors and focus, a full demo order, stock reduction, admin add/edit/delete with validation and confirmation, the mobile menu, and the 404 page. Every page was checked at 320, 375, 425, 768, 1024 and 1440px for horizontal scrolling and tap-target size, with no console errors.

### Manual test checklist

1. Products page: type "mug" in search, then choose a category and a sort order. Clear filters.
2. Open a product, choose quantity 3, add to cart. The cart badge shows 3.
3. Go to Home and back, then refresh. The cart is still there.
4. In the cart, change quantities and remove an item. Check that totals update.
5. Click "Place demo order" with an empty form and check the error messages.
6. Fill the form correctly and place the order. Check the confirmation page.
7. On `/admin`, add a product, edit its price, then delete it.
8. Use your browser's device toolbar to try 320px, 768px and 1440px widths.

---

## Known limitations

- **localStorage is demo storage, not a database.** Data lives only in the browser where it was created. Another browser, device or user sees the original sample data. Clearing browser data resets everything.
- **No login or security on `/admin`.** Anyone who opens the page can change products (in their own browser only).
- **No real payments, emails or deliveries.** Checkout is a demonstration.
- **Only the latest order is kept.** There is no order history page.
- Product pages for products added on the admin page get a general browser-tab title, because the server does not know about them.
- Prices are whole rupees and include GST; there are no coupons or taxes calculated separately.

---

## Deployment (Vercel)

Vercel is made by the Next.js team and has a free plan.

1. Put the project on GitHub:
   ```bash
   git init
   git add .
   git commit -m "Nexora e-commerce website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/nexora.git
   git push -u origin main
   ```
2. Sign in at https://vercel.com with GitHub and click **Add New → Project**.
3. Import the `nexora` repository. Vercel detects Next.js; keep the default build command (`npm run build`).
4. Optional: under **Environment Variables**, add `NEXT_PUBLIC_SITE_URL` with your site address.
5. Click **Deploy**. You get a link like `https://nexora-xyz.vercel.app`.
6. To use your own domain: **Project → Settings → Domains**, add the domain and copy the DNS records Vercel shows into your domain provider (for example GoDaddy). Then update `NEXT_PUBLIC_SITE_URL` and redeploy.

After deploying, open the home page, a product page, the cart, checkout and `/admin` to confirm they load.

Other hosts that run Node.js work too: run `npm install`, `npm run build`, then `npm start` (port 3000 by default; use `npm start -- -p 8080` to change it).

### Troubleshooting

| Problem | Fix |
| --- | --- |
| `npm install` fails or Next.js says the Node version is too old | Install Node.js 20.9+ (22 recommended) |
| Port 3000 already in use | `npm run dev -- -p 3001` |
| Styles missing | Make sure `postcss.config.mjs` and `src/app/globals.css` are present, then restart `npm run dev` |
| Old products or cart showing | They are in localStorage. Use "Restore sample data" on `/admin`, or clear site data in the browser |
| Build fails on Vercel | Run `npm run check` locally first; it runs the same type check, lint and build |
