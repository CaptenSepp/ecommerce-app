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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
    >
      <Route
        index
        element={<Home />}
      />
      <Route
        path="products"
        element={<ProductsPage />}
      />
      <Route
        path="products/:productId"
        element={<ProductDetails />}
      />
      <Route
        path="cart"
        element={<Cart />}
      />
      <Route
        path="checkout"
        element={<Checkout />}
      />
      <Route
        path="order-confirmation"
        element={<OrderConfirmation />}
      />
      <Route
        path="wishlist"
        element={<Wishlist />}
      />
      <Route
        path="about"
        element={<About />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
      <Route
        path="login"
        element={<LoginPage />}
      />

    </Route>
  )
);

export default router;
