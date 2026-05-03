import { vi } from "vitest"
import { configureStore } from "@reduxjs/toolkit"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { ToastContext } from "@/components/ui/toastContext"
import cartReducer from "@/features/cart/cartSlice"
import type { Category, Product } from "@/features/products/services"
import wishlistReducer from "@/features/wishlist/wishlistSlice"
import ProductsPage from "@/pages/Products"

export const buildProduct = (overrides?: Partial<Product>): Product => ({
  id: 1,
  title: "Mock Product",
  description: "Mock description",
  price: 30,
  discountPercentage: 0,
  rating: 4.5,
  stock: 12,
  brand: "Mock Brand",
  category: "beauty",
  thumbnail: "",
  images: [],
  ...overrides,
}) // product builder

export const buildCategory = (overrides?: Partial<Category>): Category => ({
  slug: "beauty",
  name: "Beauty",
  ...overrides,
}) // category builder

export const renderProductsPage = () => {
  const store = configureStore({
    reducer: { cart: cartReducer, wishlist: wishlistReducer },
    preloadedState: { cart: { items: [] }, wishlist: { items: [] } },
  }) // keep page providers simple

  return render(
    <Provider store={store}>
      <ToastContext.Provider value={{ notify: vi.fn() }}>
        <MemoryRouter>
          <ProductsPage />
        </MemoryRouter>
      </ToastContext.Provider>
    </Provider>,
  )
}
