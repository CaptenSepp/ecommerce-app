import { describe, expect, it, beforeEach, vi } from 'vitest' // test helpers
import { render, screen, waitFor } from '@testing-library/react' // RTL helpers
import userEvent from '@testing-library/user-event' // user interactions
import { Provider } from 'react-redux' // redux provider
import { configureStore } from '@reduxjs/toolkit' // test store setup
import { MemoryRouter } from 'react-router-dom' // router context for Link
import Checkout from '@/pages/Checkout' // component under test
import cartReducer from '@/features/cart/cartSlice' // cart slice reducer
import authReducer from '@/features/auth/authSlice' // auth slice reducer
import { createOrder } from '@/features/orders/services' // order service
import type { Product } from '@/features/products/services' // product type

const navigateMock = vi.fn() // capture navigation calls
const CUSTOMER_STORAGE_KEY = 'checkout-customer-session' // shared session key

vi.mock('react-router-dom', async () => { // mock useNavigate only
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom') // keep real exports
  return {
    ...actual,
    useNavigate: () => navigateMock, // swap useNavigate
  }
})

vi.mock('@/features/orders/services', () => ({ // mock order creation
  createOrder: vi.fn(), // mock createOrder
}))

const buildItem = (overrides?: Partial<Product> & { quantity?: number }) => ({ // helper for cart items
  id: 202,
  title: 'Checkout Item',
  description: 'Checkout fixture',
  price: 20,
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
    reducer: { cart: cartReducer, auth: authReducer }, // only slices needed here
    preloadedState: { cart: { items }, auth: { user: null } }, // start signed out
  })

  return render(
    <Provider store={store}>
      <MemoryRouter> {/* provide router context for Link */}
        <Checkout />
      </MemoryRouter>
    </Provider>
  )
}

beforeEach(() => {
  navigateMock.mockClear() // reset navigation spy
  vi.mocked(createOrder).mockReset() // reset createOrder mock
  window.sessionStorage.clear() // keep tests isolated
})

describe('Checkout session customer data', () => {
  it('prefills the form from sessionStorage', () => {
    window.sessionStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      address: '123 Long Street',
    })) // store customer data for the session

    renderWithStore([buildItem()]) // render checkout with one item

    expect(screen.getByLabelText('Full name')).toHaveValue('Ada Lovelace') // name restored
    expect(screen.getByLabelText('Email')).toHaveValue('ada@example.com') // email restored
    expect(screen.getByLabelText('Address')).toHaveValue('123 Long Street') // address restored
  })

  it('saves customer data to sessionStorage after a successful order', async () => {
    const user = userEvent.setup() // user event setup
    vi.mocked(createOrder).mockResolvedValueOnce({
      id: 'order_123',
      createdAt: new Date().toISOString(),
      customer: { name: 'Ada Lovelace', email: 'ada@example.com', address: '123 Long Street' },
      items: [{ id: 202, title: 'Checkout Item', price: 20, quantity: 1 }],
      totals: { subtotal: 20, shipping: 4.99, total: 24.99 },
    }) // mock order response

    renderWithStore([buildItem()]) // render checkout with one item

    await user.type(screen.getByLabelText('Full name'), 'Ada Lovelace') // fill name
    await user.type(screen.getByLabelText('Email'), 'ADA@example.com') // fill email with uppercase
    await user.type(screen.getByLabelText('Address'), '123 Long Street') // fill address
    await user.click(screen.getByRole('button', { name: /place order/i })) // submit form

    await waitFor(() => {
      expect(window.sessionStorage.getItem(CUSTOMER_STORAGE_KEY)).toBeTruthy() // session data saved
    })

    expect(JSON.parse(window.sessionStorage.getItem(CUSTOMER_STORAGE_KEY) ?? '{}')).toEqual({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      address: '123 Long Street',
    }) // saved data is trimmed and normalized
  })
})
