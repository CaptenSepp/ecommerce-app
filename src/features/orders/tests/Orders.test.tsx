import { describe, expect, it, vi } from 'vitest' // test helpers
import { render, screen, waitFor } from '@testing-library/react' // RTL helpers
import { Provider } from 'react-redux' // redux provider
import { configureStore } from '@reduxjs/toolkit' // test store setup
import { MemoryRouter } from 'react-router-dom' // router wrapper
import OrdersPage from '@/features/orders/pages/Orders' // page under test
import cartReducer from '@/features/cart/cartSlice' // cart reducer
import wishlistReducer from '@/features/wishlist/wishlistSlice' // wishlist reducer
import authReducer from '@/features/auth/authSlice' // auth reducer
import { getOrders } from '@/features/orders/services' // orders service

vi.mock('@/features/orders/services', () => ({ // mock orders API
  getOrders: vi.fn(), // mock getOrders
}))

describe('OrdersPage', () => {
  it('renders orders for the signed-in user', async () => {
    const getOrdersMock = vi.mocked(getOrders) // typed mock helper
    getOrdersMock.mockResolvedValueOnce([
      {
        id: 'order_abc',
        createdAt: new Date().toISOString(),
        customer: { name: 'Test User', email: 'test@example.com', address: '1 Street' },
        items: [{ id: 1, title: 'Order Item', price: 10, quantity: 2 }],
        totals: { subtotal: 20, shipping: 4.99, total: 24.99 },
      },
    ]) // mock orders list

    const store = configureStore({
      reducer: { cart: cartReducer, wishlist: wishlistReducer, auth: authReducer }, // reducers
      preloadedState: {
        cart: { items: [] },
        wishlist: { items: [] },
        auth: { user: { id: 'u1', name: 'Test User', email: 'test@example.com' } },
      }, // signed-in user
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OrdersPage />
        </MemoryRouter>
      </Provider>
    )

    await waitFor(() => {
      expect(screen.getByText('order_abc')).toBeInTheDocument() // order id visible
    })
    expect(screen.getByText('Order Item x 2')).toBeInTheDocument() // item detail visible
  })
})
