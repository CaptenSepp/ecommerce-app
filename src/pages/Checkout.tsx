import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'
import { setUser } from '@/features/auth/authSlice'
import { clearCart } from '@/features/cart/cartSlice'
import { createOrder } from '@/features/orders/services'
import { useNavigate, Link } from 'react-router-dom'
import { useRef, useState } from 'react'

const focusRingClass = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2' // visible keyboard focus
const CUSTOMER_STORAGE_KEY = 'checkout-customer-session' // session key for guest customer data

type CheckoutFormValues = { // form model for validation
  name: string
  email: string
  address: string
}

type CheckoutFormErrors = Partial<Record<keyof CheckoutFormValues | 'form', string>> // field + form errors

const emptyCheckoutFormValues: CheckoutFormValues = { // empty form fallback
  name: '',
  email: '',
  address: '',
}

const loadStoredCustomer = (): CheckoutFormValues => { // read customer data for this browser session
  if (typeof window === 'undefined') return emptyCheckoutFormValues // guard SSR-like environments
  try {
    const rawValue = window.sessionStorage.getItem(CUSTOMER_STORAGE_KEY) // load saved customer draft
    if (!rawValue) return emptyCheckoutFormValues // fallback when nothing was saved
    return { ...emptyCheckoutFormValues, ...JSON.parse(rawValue) as Partial<CheckoutFormValues> } // keep expected shape
  } catch {
    return emptyCheckoutFormValues // ignore storage or parse failures
  }
}

const saveStoredCustomer = (customer: CheckoutFormValues) => { // keep latest customer data in this tab session
  if (typeof window === 'undefined') return // guard SSR-like environments
  try {
    window.sessionStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customer)) // persist only checkout fields
  } catch { // ignore storage write failures
  }
}

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
  const initialCustomer = useRef(loadStoredCustomer()).current // load session customer only once

  const [name, setName] = useState(initialCustomer.name) // controlled input for full name
  const [email, setEmail] = useState(initialCustomer.email) // controlled input for email
  const [address, setAddress] = useState(initialCustomer.address) // controlled input for address
  const [errors, setErrors] = useState<CheckoutFormErrors>({}) // current validation errors
  const [touched, setTouched] = useState<Partial<Record<keyof CheckoutFormValues, boolean>>>({}) // tracks interacted fields
  const nameInputRef = useRef<HTMLInputElement | null>(null) // focus target for invalid name
  const emailInputRef = useRef<HTMLInputElement | null>(null) // focus target for invalid email
  const addressInputRef = useRef<HTMLTextAreaElement | null>(null) // focus target for invalid address

  const placeOrder = async (e: React.FormEvent) => { // submit handler
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

    const trimmedCustomer = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      address: address.trim(),
    } // normalize once before saving and sending
    const order = await createOrder(items, trimmedCustomer) // create order record

    saveStoredCustomer(trimmedCustomer) // keep customer fields for next order in this session
    dispatch(setUser({ id: trimmedCustomer.email, name: trimmedCustomer.name, email: trimmedCustomer.email })) // keep orders page in sync
    dispatch(clearCart()) // empty the cart after placing order
    navigate(`/order-confirmation?orderId=${order.id}`, { // go to confirmation page
      replace: true,
      state: { order },
    })
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
                <span className="truncate">{it.title} x {it.quantity}</span>
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
