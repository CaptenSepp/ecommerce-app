import { describe, expect, it } from 'vitest' // test helpers
import { render, screen } from '@testing-library/react' // RTL helpers
import { Provider } from 'react-redux' // redux provider
import { configureStore } from '@reduxjs/toolkit' // test store factory
import { MemoryRouter } from 'react-router-dom' // router wrapper for Link
import wishlistReducer from '@/features/wishlist/wishlistSlice' // wishlist slice
import cartReducer from '@/features/cart/cartSlice' // cart slice for dispatch targets
import WishlistItemsList from '@/features/wishlist/components/WishlistItemsList' // component under test
import type { Product } from '@/features/products/services' // product type

const buildProduct = (overrides?: Partial<Product>): Product => ({ // product builder
  id: 1,
  title: 'Wish Item',
  description: 'Wishlist item',
  price: 40,
  discountPercentage: 0,
  rating: 4,
  stock: 9,
  brand: 'Brand',
  category: 'beauty',
  thumbnail: '',
  images: [],
  ...overrides,
})

const renderWithStore = (items: Product[]) => { // render helper with store + router
  const store = configureStore({
    reducer: { wishlist: wishlistReducer, cart: cartReducer }, // reducers used by component
    preloadedState: { wishlist: { items }, cart: { items: [] } }, // preload wishlist items
  })
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <WishlistItemsList />
      </MemoryRouter>
    </Provider>
  )
}

describe('WishlistItemsList', () => {
  it('renders empty state when no items exist', () => {
    renderWithStore([]) // render with empty wishlist
    expect(screen.getByText('Your wishlist is empty.')).toBeInTheDocument() // empty message
  })

  it('renders wishlist items when present', () => {
    const item = buildProduct({ title: 'Wish Item A' }) // sample item
    renderWithStore([item]) // render with data
    expect(screen.getByText('Wish Item A')).toBeInTheDocument() // item title visible
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument() // action button
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument() // remove button
  })
})
