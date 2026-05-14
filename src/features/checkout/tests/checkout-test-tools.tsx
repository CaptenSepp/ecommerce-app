import { configureStore } from "@reduxjs/toolkit"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import authReducer from "@/features/auth/authSlice"
import cartReducer from "@/features/cart/cartSlice"
import type { Product } from "@/features/products/services"
import Checkout from "@/features/checkout/pages/Checkout"

export const buildItem = (overrides?: Partial<Product> & { quantity?: number }) => ({
  id: 202,
  title: "Checkout Item",
  description: "Checkout fixture",
  price: 20,
  discountPercentage: 0,
  rating: 4,
  stock: 10,
  brand: "Brand",
  category: "cat",
  thumbnail: "",
  images: [],
  quantity: 1,
  ...overrides,
}) // cart item builder for tests

export const renderCheckoutWithStore = (items: Array<Product & { quantity: number }>) => {
  const store = configureStore({
    reducer: { cart: cartReducer, auth: authReducer },
    preloadedState: { cart: { items }, auth: { user: null } },
  }) // keep store shape stable for all checkout tests

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          <Checkout />
        </MemoryRouter>
      </Provider>,
    ),
  }
}
