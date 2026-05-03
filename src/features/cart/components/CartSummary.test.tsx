import { describe, expect, it, beforeEach, vi } from 'vitest' // test helpers
import { render, screen, within } from '@testing-library/react' // RTL helpers
import userEvent from '@testing-library/user-event' // user interactions
import { Provider } from 'react-redux' // redux provider
import { configureStore } from '@reduxjs/toolkit' // test store setup
import cartReducer, { updateQuantity } from '@/features/cart/cartSlice' // cart slice reducer
import CartSummary from '@/features/cart/components/CartSummary' // component under test
import type { Product } from '@/features/products/services' // product type

const navigateMock = vi.fn() // capture navigation calls

vi.mock('react-router-dom', async () => { // mock useNavigate only
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom') // keep real exports
  return {
    ...actual,
    useNavigate: () => navigateMock, // swap useNavigate
  }
})

const buildItem = (overrides?: Partial<Product> & { quantity?: number }) => ({ // helper for cart items
  id: 1,
  title: 'Item',
  description: 'Cart item',
  price: 10,
  discountPercentage: 0,
  rating: 4,
  stock: 10,
  brand: 'Brand',
  category: 'cat',
  thumbnail: '',
  images: [],
  quantity: 1,
  ...overrides,
})

const renderWithStore = (items: Array<Product & { quantity: number }>) => { // render helper with store
  const store = configureStore({
    reducer: { cart: cartReducer }, // only cart slice needed
    preloadedState: { cart: { items } }, // preload cart state
  })
  return {
    store,
    ...render(
    <Provider store={store}>
      <CartSummary />
    </Provider>
    ),
  }
}

beforeEach(() => {
  navigateMock.mockClear() // reset navigation spy
})

describe('CartSummary totals and button state', () => {
  it('shows zero totals and disables checkout when cart is empty', () => {
    renderWithStore([]) // render with empty cart
    const shippingRow = screen.getByText('Shipping').closest('div') // locate shipping row
    expect(within(shippingRow!).getByText('$0.00')).toBeInTheDocument() // shipping is 0
    expect(screen.getByText('$0.00 USD')).toBeInTheDocument() // total is 0
    expect(screen.getByRole('button', { name: /check out/i })).toBeDisabled() // button disabled
  })

  it('computes subtotal, shipping, and total when cart has items', () => {
    renderWithStore([buildItem({ price: 12.5, quantity: 2 })]) // subtotal 25.00
    const subtotalRow = screen.getByText('Subtotal').closest('div') // locate subtotal row
    expect(within(subtotalRow!).getByText('$25.00')).toBeInTheDocument() // subtotal shows 25.00
    const shippingRow = screen.getByText('Shipping').closest('div') // locate shipping row
    expect(within(shippingRow!).getByText('$4.99')).toBeInTheDocument() // shipping applies
    expect(screen.getByText('$29.99 USD')).toBeInTheDocument() // total includes shipping
    expect(screen.getByRole('button', { name: /check out/i })).toBeEnabled() // button enabled
  })
})

describe('CartSummary navigation', () => {
  it('navigates to /checkout on button click', async () => {
    const user = userEvent.setup() // user event setup
    renderWithStore([buildItem()]) // ensure button is enabled
    await user.click(screen.getByRole('button', { name: /check out/i })) // click checkout
    expect(navigateMock).toHaveBeenCalledWith('/checkout') // route to checkout
  })
})

describe('CartSummary state updates', () => {
  it('updates totals when cart quantity changes', () => {
    const { store } = renderWithStore([buildItem({ price: 10, quantity: 1 })]) // initial item
    expect(screen.getByText('$10.00 USD')).toBeInTheDocument() // total with shipping
    store.dispatch(updateQuantity({ id: 1, quantity: 3 })) // increase quantity in store
    expect(screen.getByText('$34.99 USD')).toBeInTheDocument() // total reflects new quantity
  })
})
