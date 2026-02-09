import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import About from "@/pages/About";
import Cart from "@/pages/Cart";
import Home from "@/pages/Home";
import Layout from "@/layouts/RootLayout";
import LoginPage from "@/pages/Login";
import NotFoundPage from "@/pages/NotFound";
import ProductDetails from "@/pages/ProductDetails";
import ProductsPage from "@/pages/Products";
import Wishlist from "@/pages/Wishlist";
import Checkout from "@/pages/Checkout";
import OrderConfirmation from "@/pages/OrderConfirmation";

const router = createBrowserRouter( // central route tree for the SPA
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />} // shared layout shell for all pages
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
