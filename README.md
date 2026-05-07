# Shopella App

Shopella is a React storefront built with Vite and TypeScript.
It has product browsing, product details, cart, wishlist, login UI, checkout, and orders.

## Current App State

- React 19 SPA with Vite and TypeScript
- Routing with React Router
- Server state with TanStack React Query
- Client state with Redux Toolkit
- Persisted slices: `cart`, `wishlist`, `auth`
- Product data from `https://dummyjson.com`
- Product names and images are demo data only; this app is not affiliated with listed brands
- Order API from `api/orders.js`
- Global error boundary and toast provider
- Floating in-browser assistant panel

## Main Routes

- `/` Home
- `/products` Product list
- `/products/:productId` Product details
- `/cart` Cart
- `/checkout` Checkout
- `/order-confirmation` Order confirmation
- `/orders` Orders for the signed-in user
- `/wishlist` Wishlist
- `/about` About
- `/retailers` Retailers
- `/login` Login
- `*` Not found page

## Data Flow

- Product and category requests live in `src/features/products/services.ts`
- Order requests live in `src/features/orders/services.ts`
- Redux store setup lives in `src/app/store.ts`
- The app saves `cart`, `wishlist`, and `auth` to `localStorage`
- `api/orders.js` keeps orders in memory by user email

## Project Structure

- `src/app` app setup: router, store, query client
- `src/layouts` shared shell parts
- `src/pages` route pages
- `src/features` feature logic and feature UI
- `src/components/ui` shared UI pieces
- `src/assets` images, fonts, logos
- `api` Vercel-style API routes
- `e2e` Playwright tests
- `archive` old kept files, not active app code

## Run

```bash
npm install
npm run dev
```

## Test

```bash
npm run test
npm run test:e2e
npm run lint
npm run typecheck
npm run build
```

## Notes

- This is a portfolio demo, so a few areas are marked as demo scope in the UI
- Product names, brand names, and images come from DummyJSON for demo/testing only
- Login is UI/client-state only
- Assistant messages are saved locally and do not call a live AI backend
- Featured collection cards are visual demo previews
- Newsletter signup and sample customer feedback are presentation-only
- Footer directory links are shown for layout, not live destinations
- Orders page needs a signed-in user from the `auth` slice
- Orders stored by `api/orders.js` are in-memory demo data, not permanent database data
