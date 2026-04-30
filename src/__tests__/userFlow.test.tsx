import { describe, expect, it, vi } from 'vitest' // test helpers
import { render, screen } from '@testing-library/react' // RTL helpers
import userEvent from '@testing-library/user-event' // user interactions
import { Provider } from 'react-redux' // redux provider
import { configureStore } from '@reduxjs/toolkit' // test store setup
import { createMemoryRouter, RouterProvider } from 'react-router-dom' // memory router
import cartReducer from '@/features/cart/cartSlice' // cart reducer
import wishlistReducer from '@/features/wishlist/wishlistSlice' // wishlist reducer
import Layout from '@/layouts/RootLayout' // layout shell
import ProductsPage from '@/pages/Products' // products page
import CartPage from '@/pages/Cart' // cart page
import Checkout from '@/pages/Checkout' // checkout page
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
  title: 'Flow Product',
  description: 'Flow description',
  price: 25,
  discountPercentage: 0,
  rating: 4.2,
  stock: 8,
  brand: 'Flow Brand',
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

describe('User flow: add to cart then checkout', () => {
  it('adds product, navigates to cart, and goes to checkout', async () => {
    const user = userEvent.setup() // user event setup
    useProductsMock.mockReturnValue({
      data: [buildProduct()],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    }) // mock products list
    useCategoriesMock.mockReturnValue({
      data: [buildCategory()],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    }) // mock categories list

    const store = configureStore({
      reducer: { cart: cartReducer, wishlist: wishlistReducer }, // reducers for flow
      preloadedState: { cart: { items: [] }, wishlist: { items: [] } }, // empty initial state
    })

    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <Layout />, // app shell with nav
          children: [
            { path: 'products', element: <ProductsPage /> }, // products route
            { path: 'cart', element: <CartPage /> }, // cart route
            { path: 'checkout', element: <Checkout /> }, // checkout route
          ],
        },
      ],
      { initialEntries: ['/products'] } // start on products page
    )

    render(
      <Provider store={store}>
        <ToastContext.Provider value={{ notify: vi.fn() }}>
          <RouterProvider router={router} />
        </ToastContext.Provider>
      </Provider>
    )

    await user.click(screen.getByRole('button', { name: /^add$/i })) // add product to cart
    await user.click(screen.getByRole('link', { name: /open cart/i })) // go to cart
    expect(screen.getByText('Your Cart')).toBeInTheDocument() // cart page visible
    await user.click(screen.getByRole('button', { name: /check out/i })) // go to checkout
    expect(screen.getByRole('heading', { name: 'Checkout' })).toBeInTheDocument() // checkout visible
  })
})
