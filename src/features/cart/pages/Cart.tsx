import CartItemsList from '@/features/cart/components/CartItemsList'
import CartSummary from '@/features/cart/components/CartSummary'

const CartPage = () => { // cart page with items and totals
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-lg px-4 md:px-8">
        <div className="mb-6 sm:mb-10 lg:mb-16">
          <h2 className="mb-4 text-center u-text-2xl u-font-bold u-text-gray-800 md:mb-6 u-text-3xl-lg">Your Cart</h2>
        </div>

        <CartItemsList /> {/* list all cart items */}
        <CartSummary /> {/* subtotal, shipping, total */}
      </div>
    </div>
  )
}

export default CartPage
