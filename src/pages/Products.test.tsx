import { describe, expect, it, vi } from "vitest"
import { screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter } from "react-router-dom"
import { ToastContext } from "@/components/ui/toastContext"
import cartReducer from "@/features/cart/cartSlice"
import wishlistReducer from "@/features/wishlist/wishlistSlice"
import ProductsPage from "@/pages/Products"
import { buildCategory, buildProduct, renderProductsPage } from "./test-tools/products-test-tools"

const useProductsMock = vi.fn() // controlled products hook mock
const useCategoriesMock = vi.fn() // controlled categories hook mock

vi.mock("@/features/products/hooks", () => ({
  useProducts: () => useProductsMock(),
  useCategories: () => useCategoriesMock(),
}))

describe("ProductsPage", () => {
  it("shows loading then renders products", () => {
    useProductsMock.mockReturnValueOnce({ data: [], isLoading: true, error: null, refetch: vi.fn() })
    useCategoriesMock.mockReturnValueOnce({ data: [], isLoading: true, error: null, refetch: vi.fn() })
    const { rerender } = renderProductsPage()
    expect(screen.getByRole("status")).toHaveTextContent("Loading...")
    useProductsMock.mockReturnValueOnce({ data: [buildProduct({ title: "Mock Product A" })], isLoading: false, error: null, refetch: vi.fn() })
    useCategoriesMock.mockReturnValueOnce({ data: [buildCategory()], isLoading: false, error: null, refetch: vi.fn() })
    rerender(
      <Provider store={configureStore({ reducer: { cart: cartReducer, wishlist: wishlistReducer }, preloadedState: { cart: { items: [] }, wishlist: { items: [] } } })}>
        <ToastContext.Provider value={{ notify: vi.fn() }}><MemoryRouter><ProductsPage /></MemoryRouter></ToastContext.Provider>
      </Provider>,
    )
    expect(screen.getByText("Mock Product A")).toBeInTheDocument()
  })
})
