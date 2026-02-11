import { describe, expect, it, beforeEach, vi } from 'vitest' // test helpers
import { render, screen } from '@testing-library/react' // RTL helpers
import userEvent from '@testing-library/user-event' // user interactions
import { Provider } from 'react-redux' // redux provider
import { configureStore } from '@reduxjs/toolkit' // test store setup
import { MemoryRouter } from 'react-router-dom' // router context for Link
import Checkout from '@/pages/Checkout' // component under test
import cartReducer from '@/features/cart/cartSlice' // cart slice reducer
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
    reducer: { cart: cartReducer }, // only cart slice needed
    preloadedState: { cart: { items } }, // preload cart state
  })
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter> {/* provide router context for Link */}
          <Checkout />
        </MemoryRouter>
      </Provider>
    ),
  }
}

beforeEach(() => {
  navigateMock.mockClear() // reset navigation spy
})

describe('Checkout validation', () => {
  it('blocks submission when required fields are missing', async () => {
    const user = userEvent.setup() // user event setup
    const { store } = renderWithStore([buildItem()]) // cart has items
    await user.click(screen.getByRole('button', { name: /place order/i })) // submit form
    expect(screen.getByText('Full name is required.')).toBeInTheDocument() // name error
    expect(screen.getByText('Email is required.')).toBeInTheDocument() // email error
    expect(screen.getByText('Address is required.')).toBeInTheDocument() // address error
    expect(store.getState().cart.items).toHaveLength(1) // cart not cleared
    expect(navigateMock).not.toHaveBeenCalled() // navigation blocked
  })
})

describe('Checkout success path', () => {
  it('clears cart and navigates to confirmation on submit', async () => {
    const user = userEvent.setup() // user event setup
    const { store } = renderWithStore([buildItem()]) // cart has items
    await user.type(screen.getByLabelText('Full name'), 'Ada Lovelace') // fill name
    await user.type(screen.getByLabelText('Email'), 'ada@example.com') // fill email
    await user.type(screen.getByLabelText('Address'), '123 Long Street') // fill address
    await user.click(screen.getByRole('button', { name: /place order/i })) // submit form
    expect(store.getState().cart.items).toHaveLength(0) // cart cleared
    expect(navigateMock).toHaveBeenCalledWith('/order-confirmation', { replace: true }) // navigation
  })
})
