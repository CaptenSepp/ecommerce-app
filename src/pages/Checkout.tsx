import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'
import { clearCart } from '@/features/cart/cartSlice'
import { useNavigate, Link } from 'react-router-dom'
import { useRef, useState } from 'react'

const focusRingClass = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2' // visible keyboard focus

type CheckoutFormValues = { // form model for validation
  name: string
  email: string
  address: string
}

type CheckoutFormErrors = Partial<Record<keyof CheckoutFormValues | 'form', string>> // field + form errors

const validateCheckoutForm = (values: CheckoutFormValues, hasItems: boolean): CheckoutFormErrors => { // central validation layer
  const errors: CheckoutFormErrors = {}
  const name = values.name.trim() // ignore outer spaces
  const email = values.email.trim() // ignore outer spaces
  const address = values.address.trim() // ignore outer spaces
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // simple practical email check

  if (!hasItems) errors.form = 'Your cart is empty.' // edge case: checkout without items
  if (!name) errors.name = 'Full name is required.'
  else if (name.length < 2) errors.name = 'Full name must be at least 2 characters.'

  if (!email) errors.email = 'Email is required.'
  else if (!emailRegex.test(email)) errors.email = 'Enter a valid email address.'

  if (!address) errors.address = 'Address is required.'
  else if (address.length < 8) errors.address = 'Address must be at least 8 characters.'

  return errors
}

const Checkout = () => { // checkout form + order summary
  const dispatch = useAppDispatch() // dispatch actions
  const navigate = useNavigate() // programmatic navigation after submit
  const items = useSelector((s: RootState) => s.cart.items) // read cart items
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0) // compute subtotal
  const shipping = items.length ? 4.99 : 0 // simple shipping rule
  const total = subtotal + shipping // final total

  const [name, setName] = useState('') // controlled input for full name
  const [email, setEmail] = useState('') // controlled input for email
  const [address, setAddress] = useState('') // controlled input for address
  const [errors, setErrors] = useState<CheckoutFormErrors>({}) // current validation errors
  const [touched, setTouched] = useState<Partial<Record<keyof CheckoutFormValues, boolean>>>({}) // tracks interacted fields
  const nameInputRef = useRef<HTMLInputElement | null>(null) // focus target for invalid name
  const emailInputRef = useRef<HTMLInputElement | null>(null) // focus target for invalid email
  const addressInputRef = useRef<HTMLTextAreaElement | null>(null) // focus target for invalid address

  const placeOrder = (e: React.FormEvent) => { // submit handler
    e.preventDefault() // stop the default page reload
    const nextErrors = validateCheckoutForm({ name, email, address }, items.length > 0) // validate all fields on submit
    setErrors(nextErrors)
    setTouched({ name: true, email: true, address: true }) // show all field errors after first submit
    if (Object.keys(nextErrors).length > 0) { // move keyboard focus to first invalid field
      if (nextErrors.name) nameInputRef.current?.focus()
      else if (nextErrors.email) emailInputRef.current?.focus()
      else if (nextErrors.address) addressInputRef.current?.focus()
      return // block submit when validation fails
    }
    dispatch(clearCart()) // empty the cart after placing order
    navigate('/order-confirmation', { replace: true }) // go to confirmation page
  }

  return (
    <div className="mx-auto max-w-screen-lg p-4">
      <div className="mb-4">
        <Link to="/cart" className="text-brand-orange hover:underline">Back to cart</Link>
      </div>

      <h1 className="u-text-2xl u-font-semibold mb-6">Checkout</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <form onSubmit={placeOrder} className="space-y-4" noValidate> {/* checkout form with custom validation */}
          {errors.form ? <p className="u-text-sm u-text-danger" role="alert">{errors.form}</p> : null}
          <div>
            <label htmlFor="checkout-name" className="block u-text-sm mb-1">Full name</label>
            <input
              id="checkout-name"
              ref={nameInputRef}
              className={`input-field ${focusRingClass} ${touched.name && errors.name ? 'border-red-500' : ''}`}
              value={name}
              onChange={e => { // update + revalidate after user touched the field
                const next = e.target.value
                setName(next)
                if (touched.name) setErrors(validateCheckoutForm({ name: next, email, address }, items.length > 0))
              }}
              onBlur={() => { // mark field as touched and validate
                setTouched(prev => ({ ...prev, name: true }))
                setErrors(validateCheckoutForm({ name, email, address }, items.length > 0))
              }}
              aria-invalid={Boolean(touched.name && errors.name)}
              aria-describedby={touched.name && errors.name ? 'checkout-name-error' : undefined}
            />
            {touched.name && errors.name ? <p id="checkout-name-error" className="mt-1 u-text-sm u-text-danger" role="alert">{errors.name}</p> : null}
          </div>
          <div>
            <label htmlFor="checkout-email" className="block u-text-sm mb-1">Email</label>
            <input
              id="checkout-email"
              ref={emailInputRef}
              type="email"
              className={`input-field ${focusRingClass} ${touched.email && errors.email ? 'border-red-500' : ''}`}
              value={email}
              onChange={e => { // update + revalidate after user touched the field
                const next = e.target.value
                setEmail(next)
                if (touched.email) setErrors(validateCheckoutForm({ name, email: next, address }, items.length > 0))
              }}
              onBlur={() => { // mark field as touched and validate
                setTouched(prev => ({ ...prev, email: true }))
                setErrors(validateCheckoutForm({ name, email, address }, items.length > 0))
              }}
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby={touched.email && errors.email ? 'checkout-email-error' : undefined}
            />
            {touched.email && errors.email ? <p id="checkout-email-error" className="mt-1 u-text-sm u-text-danger" role="alert">{errors.email}</p> : null}
          </div>
          <div>
            <label htmlFor="checkout-address" className="block u-text-sm mb-1">Address</label>
            <textarea
              id="checkout-address"
              ref={addressInputRef}
              className={`input-field ${focusRingClass} ${touched.address && errors.address ? 'border-red-500' : ''}`}
              value={address}
              onChange={e => { // update + revalidate after user touched the field
                const next = e.target.value
                setAddress(next)
                if (touched.address) setErrors(validateCheckoutForm({ name, email, address: next }, items.length > 0))
              }}
              onBlur={() => { // mark field as touched and validate
                setTouched(prev => ({ ...prev, address: true }))
                setErrors(validateCheckoutForm({ name, email, address }, items.length > 0))
              }}
              aria-invalid={Boolean(touched.address && errors.address)}
              aria-describedby={touched.address && errors.address ? 'checkout-address-error' : undefined}
              rows={3}
            />
            {touched.address && errors.address ? <p id="checkout-address-error" className="mt-1 u-text-sm u-text-danger" role="alert">{errors.address}</p> : null}
          </div>
          <button type="submit" className={`btn btn-primary ${focusRingClass}`}>Place Order</button>
        </form>

        <aside className="rounded-lg p-4" style={{ background: 'var(--surface)' }}> {/* order summary */}
          <h2 className="u-text-lg u-font-semibold mb-3">Order Summary</h2>
          <ul className="space-y-2 mb-4">
            {items.map(it => ( // render line items
              <li key={it.id} className="flex justify-between u-text-sm">
                <span className="truncate">{it.title} × {it.quantity}</span>
                <span>${(it.price * it.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-1 text-muted">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
          </div>
          <div className="mt-3 border-t pt-3 flex justify-between u-font-bold">
            <span>Total</span><span>${total.toFixed(2)} USD</span>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Checkout
