import { Link } from 'react-router-dom'

const OrderConfirmation = () => {
  return (
    <div className="mx-auto max-w-md p-6 text-center">
      <h1 className="text-2xl font-semibold mb-2">Thank you!</h1>
      <p className="text-muted mb-6">Your order has been placed successfully.</p>
      <div className="flex justify-center gap-3">
        <Link to="/products" className="btn btn-secondary">Continue Shopping</Link>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    </div>
  )
}

export default OrderConfirmation
