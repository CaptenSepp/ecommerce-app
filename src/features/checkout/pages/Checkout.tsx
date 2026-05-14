import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { RootState, useAppDispatch } from "@/app/store"
import { setUser } from "@/features/auth/authSlice"
import { clearCart } from "@/features/cart/cartSlice"
import { createOrder } from "@/features/orders/services"
import CheckoutForm from "../components/CheckoutForm"
import OrderSummary from "../components/OrderSummary"
import { loadStoredCustomer, saveStoredCustomer } from "../checkout-tools"

const Checkout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const items = useSelector((state: RootState) => state.cart.items)
  const user = useSelector((state: RootState) => state.auth.user)
  const storedCustomer = loadStoredCustomer()
  const initialCustomer = {
    ...storedCustomer,
    name: user?.name ?? storedCustomer.name,
    email: user?.email ?? storedCustomer.email,
  } // Use signed-in browser data for name/email, but keep address from checkout storage.

  return (
    <div className="app-page-shell app-page-shell--wide">
      <div className="mb-4"><Link to="/cart" className="text-brand-orange hover:underline">Back to cart</Link></div>
      <h1 className="mb-6 u-text-2xl u-font-semibold">Checkout</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <CheckoutForm
          hasItems={items.length > 0}
          initialValues={initialCustomer} // Prefill once so the user does not need to retype saved checkout details.
          onSubmit={async (values) => {
            // Clean the values once here so every later step uses the same normalized customer data.
            const trimmedCustomer = { name: values.name.trim(), email: values.email.trim().toLowerCase(), address: values.address.trim() }

            // Create the order before clearing local state.
            // That way a failed request does not erase the user's cart.
            const order = await createOrder(items, trimmedCustomer)

            // After success, keep the checkout details for next time and move the app into its "ordered" state.
            saveStoredCustomer(trimmedCustomer)
            dispatch(setUser({ id: trimmedCustomer.email, name: trimmedCustomer.name, email: trimmedCustomer.email }))
            dispatch(clearCart()) // Clear only after success so the cart is not lost on a failed order request.
            navigate(`/order-confirmation?orderId=${order.id}`, { replace: true, state: { order } }) // Send the created order along with navigation so the confirmation page can render immediately.
          }}
        />
        <OrderSummary items={items} />
      </div>
    </div>
  )
}

export default Checkout
