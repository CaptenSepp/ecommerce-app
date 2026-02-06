import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'
import { clearCart } from '@/features/cart/cartSlice'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

// renders the checkout form (component) and order summary (UI) using cart state (store)
const Checkout = () => {
  const dispatch = useAppDispatch() // prepare to send actions (dispatch)
  const navigate = useNavigate() // programmatic navigation after submit (route)
  const items = useSelector((s: RootState) => s.cart.items) // read cart items from the store (selector)
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0) // compute subtotal from items (derived state)
  const shipping = items.length ? 4.99 : 0 // simple shipping rule (business logic)
  const total = subtotal + shipping // final total shown to user (calculated)

  const [name, setName] = useState('') // controlled input for full name (state)
  const [email, setEmail] = useState('') // controlled input for email (state)
  const [address, setAddress] = useState('') // controlled input for address (state)

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault() // stop the default page reload (event)
    // naive validation -> simple required-field checks (basic validation)
    if (!name || !email || !address) return
    dispatch(clearCart()) // empty the cart after placing order (dispatch action)
    navigate('/order-confirmation', { replace: true }) // go to confirmation page (route)
  }

  return (
    <div className="mx-auto max-w-screen-lg p-4">
      <div className="mb-4">
        <Link to="/cart" className="text-brand-orange hover:underline">Back to cart</Link>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <form onSubmit={placeOrder} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Full name</label>
            <input className="input-field" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" className="input-field" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Address</label>
            <textarea className="input-field" value={address} onChange={e => setAddress(e.target.value)} required rows={3} />
          </div>
          <button type="submit" className="btn btn-primary">Place Order</button>
        </form>

        <aside className="rounded-lg p-4" style={{ background: 'var(--surface)' }}>
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
          <ul className="space-y-2 mb-4">
            {items.map(it => (
              <li key={it.id} className="flex justify-between text-sm">
                <span className="truncate">{it.title} × {it.quantity}</span>
                <span>${(it.price * it.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-1 text-muted">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
          </div>
          <div className="mt-3 border-t pt-3 flex justify-between font-bold">
            <span>Total</span><span>${total.toFixed(2)} USD</span>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Checkout
