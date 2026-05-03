import { describe, expect, it, vi } from 'vitest' // test helpers
import { render, screen } from '@testing-library/react' // RTL helpers
import { Provider } from 'react-redux' // redux provider
import { configureStore } from '@reduxjs/toolkit' // test store setup
import { MemoryRouter } from 'react-router-dom' // router wrapper for search params
import ProductsPage from '@/pages/Products' // page under test
import cartReducer from '@/features/cart/cartSlice' // cart reducer
import wishlistReducer from '@/features/wishlist/wishlistSlice' // wishlist reducer
import { ToastContext } from '@/components/ui/toastContext' // toast provider
import type { Product, Category } from '@/features/products/services' // product types

const useProductsMock = vi.fn() // controlled products hook mock
const useCategoriesMock = vi.fn() // controlled categories hook mock

vi.mock('@/features/products/hooks', () => ({ // mock React Query hooks
  useProducts: () => useProductsMock(), // use controlled return value
  useCategories: () => useCategoriesMock(), // use controlled return value
}))

const buildProduct = (overrides?: Partial<Product>): Product => ({ // product builder
  id: 1,
  title: 'Mock Product',
  description: 'Mock description',
  price: 30,
  discountPercentage: 0,
  rating: 4.5,
  stock: 12,
  brand: 'Mock Brand',
  category: 'beauty',
  thumbnail: '',
  images: [],
  ...overrides,
})

const buildCategory = (overrides?: Partial<Category>): Category => ({ // category builder
  slug: 'beauty',
  name: 'Beauty',
  ...overrides,
})

const renderWithProviders = () => { // shared render helper
  const store = configureStore({
    reducer: { cart: cartReducer, wishlist: wishlistReducer }, // reducers for page
    preloadedState: { cart: { items: [] }, wishlist: { items: [] } }, // empty defaults
  })
  return render(
    <Provider store={store}> {/* provide Redux store for the page */}
      <ToastContext.Provider value={{ notify: vi.fn() }}> {/* stable toast provider for useToast */}
        <MemoryRouter> {/* router needed for search params */}
          <ProductsPage />
        </MemoryRouter>
      </ToastContext.Provider>
    </Provider>
  )
}

describe('ProductsPage', () => {
  it('shows loading then renders products', () => {
    useProductsMock.mockReturnValueOnce({
      data: [],
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    }) // loading state for products
    useCategoriesMock.mockReturnValueOnce({
      data: [],
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    }) // loading state for categories

    const { rerender } = renderWithProviders() // initial render
    expect(screen.getByRole('status')).toHaveTextContent('Loading...') // loading state visible

    useProductsMock.mockReturnValueOnce({
      data: [buildProduct({ title: 'Mock Product A' })],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    }) // loaded products
    useCategoriesMock.mockReturnValueOnce({
      data: [buildCategory()],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    }) // loaded categories

    rerender(
      <Provider store={configureStore({ // provide fresh store for the rerender
        reducer: { cart: cartReducer, wishlist: wishlistReducer }, // consistent reducers
        preloadedState: { cart: { items: [] }, wishlist: { items: [] } }, // clean state
      })}>
        <ToastContext.Provider value={{ notify: vi.fn() }}> {/* toast provider for useToast */}
          <MemoryRouter> {/* router wrapper for search params */}
            <ProductsPage />
          </MemoryRouter>
        </ToastContext.Provider>
      </Provider>
    ) // rerender with loaded data

    expect(screen.getByText('Mock Product A')).toBeInTheDocument() // product rendered
  })
})
