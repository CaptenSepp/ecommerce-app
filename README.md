# E-commerce App (React + TypeScript)

An e-commerce SPA built with Vite + React + TypeScript.
It includes a product catalog (fetched from DummyJSON), product details, cart + wishlist (Redux, persisted to localStorage), and a simple checkout flow.

## Features

- Product catalog with search, category filtering, sorting, and a "sale" mode (via URL query params).
- Product details page with add-to-cart and wishlist actions.
- Cart with quantity adjustments, subtotal/shipping/total summary, and checkout.
- Wishlist with remove and add-to-cart.
- Toast notifications for key actions.

## Tech Stack (Actual)

- React 19 + TypeScript
- React Router (data router) with nested layout routes
- Redux Toolkit + React Redux (cart + wishlist, persisted to localStorage)
- TanStack React Query (server-state fetching + caching)
- Tailwind CSS v4 + custom tokens/classes in `src/index.css` and `src/App.css`
- Vite

## Data Source

- Products and categories are fetched from `https://dummyjson.com`.

## Routes (Main Screens)

- `/` Home (marketing sections + product scroll rows)
- `/products` Product catalog (filters in URL query params: `cat`, `q`, `sort`, `sale`)
- `/products/:productId` Product details
- `/cart` Cart
- `/checkout` Checkout form
- `/order-confirmation` Confirmation screen
- `/wishlist` Wishlist
- `/about` About
- `/login` Login (UI only)

## Getting Started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build
npm run preview
npm run lint
```

## Live Demo – 30 Seconds

- Production URL: https://YOUR-VERCEL-APP.vercel.app
- Demo mode URL: https://YOUR-VERCEL-APP.vercel.app?demo=1
- Direct checkout URL: https://YOUR-VERCEL-APP.vercel.app/checkout?demo=1
