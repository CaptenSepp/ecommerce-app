# E-Commerce App

This project is a React storefront built with Vite and TypeScript. It includes product browsing, product details, cart and wishlist state, checkout, and order history.

## What The App Does

- Shows a home page with featured shopping sections.
- Fetches products and categories from DummyJSON.
- Lets users browse, search, filter, and sort products.
- Lets users view product details and add items to cart or wishlist.
- Lets users complete checkout and create an order.
- Lets users view order history by email through the local Express server.

## User Flow

`browse products -> cart -> checkout -> order history`

## Stack

- React 19
- TypeScript
- Vite
- React Router
- Redux Toolkit
- React Redux
- TanStack React Query
- Tailwind CSS v4
- Express

## Main Routes

- `/` Home
- `/products` Product catalog
- `/products/:productId` Product details
- `/cart` Cart
- `/checkout` Checkout
- `/order-confirmation` Order confirmation
- `/orders` Order history
- `/wishlist` Wishlist
- `/about` About
- `/login` Login
- `/retailers` Retailers

## Data

- Product catalog data comes from `https://dummyjson.com`.
- Orders are created and read from the local Express server in `server/`.
- Cart and wishlist are stored in browser `localStorage`.

## Run The Project

Frontend:

```bash
npm install
npm run dev
```

Backend:

```bash
cd server
npm install
npm run dev
```

## Test Commands

```bash
npm run test
npm run test:e2e
npm run lint
npm run typecheck
npm run build
```
