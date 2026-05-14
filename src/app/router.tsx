import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import About from "@/features/about/pages/About";
import Account from "@/features/account/pages/Account";
import Cart from "@/features/cart/pages/Cart";
import Home from "@/features/home/pages/Home";
import Layout from "@/layouts/RootLayout";
import LoginPage from "@/features/auth/pages/Login";
import NotFoundPage from "@/features/error/pages/NotFound";
import ProductDetails from "@/features/products/pages/ProductDetails";
import ProductsPage from "@/features/products/pages/Products";
import Wishlist from "@/features/wishlist/pages/Wishlist";
import Checkout from "@/features/checkout/pages/Checkout";
import OrderConfirmation from "@/features/checkout/pages/OrderConfirmation";
import Retailers from "@/features/retailers/pages/Retailers";
import ErrorPage from "@/features/error/pages/ErrorPage";
import OrdersPage from "@/features/orders/pages/Orders";

const router = createBrowserRouter( // central route tree for the SPA
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />} // shared layout shell for all pages
      errorElement={<ErrorPage />} // router-level error fallback
    >
      <Route
        index
        element={<Home />} // home page
      />
      <Route
        path="products" // product listing
        element={<ProductsPage />}
      />
      <Route
        path="products/:productId" // product details by id
        element={<ProductDetails />}
      />
      <Route
        path="cart" // cart page
        element={<Cart />}
      />
      <Route
        path="checkout" // checkout page
        element={<Checkout />}
      />
      <Route
        path="account" // account page with user orders
        element={<Account />}
      />
      <Route
        path="orders" // orders page (protected)
        element={<OrdersPage />}
      />
      <Route
        path="order-confirmation" // post-order confirmation
        element={<OrderConfirmation />}
      />
      <Route
        path="wishlist" // wishlist page
        element={<Wishlist />}
      />
      <Route
        path="about" // about page
        element={<About />}
      />
      <Route
        path="retailers" // retailers map page
        element={<Retailers />}
      />
      <Route
        path="*" // catch-all 404
        element={<NotFoundPage />}
      />
      <Route
        path="login" // login page (UI only)
        element={<LoginPage />}
      />

    </Route>
  )
);

export default router; // RouterProvider consumes this instance
