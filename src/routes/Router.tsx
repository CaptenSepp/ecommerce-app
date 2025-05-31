import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import About from "../pages/About";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Layout from "../pages/layout/Layout";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProductDetails from "../pages/ProductDetails";
import Products from "../pages/Products";
import Wishlist from "../pages/Wishlist";

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
        element={<Products />}
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
        path="wishlist"
        element={<Wishlist />}
      />
      <Route
        path="about"
        element={<About />}
      />
      <Route
        path="*"
        element={<NotFound />}
      />
      <Route
        path="login"
        element={<Login />}
      />

    </Route>
  )
);

export default router;
