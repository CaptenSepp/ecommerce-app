import { useEffect, useState } from 'react' // React hooks
import { Link } from 'react-router-dom' // router links
import { useSelector } from 'react-redux' // redux selector
import { RootState } from '@/app/store' // root state type
import { getOrders } from '@/features/orders/services' // orders service
import type { Order } from '@/features/orders/types' // order type
import ProductPrice from '@/features/products/components/ProductPrice'

const OrdersPage = () => { // orders list page
  const user = useSelector((state: RootState) => state.auth.user) // read auth user
  const [orders, setOrders] = useState<Order[]>([]) // orders state
  const [isLoading, setIsLoading] = useState(false) // loading state

  useEffect(() => { // load orders for signed-in user
    if (!user) return // skip when signed out
    setIsLoading(true) // show loading state
    getOrders(user.email)
      .then(setOrders)
      .catch(() => setOrders([])) // fallback to empty on error
      .finally(() => setIsLoading(false))
  }, [user])

  if (!user) { // protect orders page
    return (
      <div className="app-page-shell app-page-shell--narrow app-page-shell--center">
        <h1 className="u-text-2xl u-font-semibold mb-2">Sign in required</h1> {/* title */}
        <p className="text-muted mb-6">Please sign in to view your orders.</p> {/* hint */}
        <Link to="/login" className="btn btn-primary">Go to login</Link> {/* CTA */}
      </div>
    )
  }

  if (isLoading) { // loading state
    return <p role="status" aria-live="polite">Loading orders...</p>
  }

  if (orders.length === 0) { // empty state
    return (
      <div className="app-page-shell app-page-shell--narrow app-page-shell--center">
        <h1 className="u-text-2xl u-font-semibold mb-2">No orders yet</h1> {/* title */}
        <p className="text-muted mb-6">Start shopping to place your first order.</p> {/* hint */}
        <Link to="/products" className="btn btn-primary">Browse products</Link> {/* CTA */}
      </div>
    )
  }

  return (
    <div className="app-page-shell app-page-shell--wide">
      <h1 className="u-text-2xl u-font-semibold mb-6">Your Orders</h1> {/* page title */}
      <div className="space-y-6">
        {orders.map((order) => ( // render each order
          <article key={order.id} className="surface-card p-4">
            <header className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <div className="u-text-sm text-muted">Order ID</div>
                <div className="u-font-semibold">{order.id}</div>
              </div>
              <div className="text-right">
                <div className="u-text-sm text-muted">Total</div>
                <div className="u-font-semibold">${order.totals.total.toFixed(2)} USD</div>
              </div>
            </header>
            <div className="space-y-2">
              {order.items.map((item) => ( // render order items
                <div key={item.id} className="flex justify-between u-text-sm">
                  <span className="truncate">{item.title} x {item.quantity}</span>
                  <ProductPrice price={item.price} discountPercentage={item.discountPercentage} quantity={item.quantity} />
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default OrdersPage
