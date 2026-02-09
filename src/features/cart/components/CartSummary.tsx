import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { useNavigate } from 'react-router-dom'

const CartSummary = () => {
  const items = useSelector((state: RootState) => state.cart.items); // read cart items
  const navigate = useNavigate(); // programmatic navigation
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0); // compute subtotal
  const shipping = items.length ? 4.99 : 0; // simple shipping rule
  const total = subtotal + shipping; // compute total

  return (
    <div className="flex flex-col items-end gap-4">
      <div className="w-full rounded-lg p-4 sm:max-w-xs" style={{ background: 'var(--surface)' }}>
        <div className="space-y-1">
          <div className="flex justify-between gap-4 text-muted">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between gap-4 text-muted">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="flex items-start justify-between gap-4 text-brand-black">
            <span className="text-lg font-bold">Total</span>

            <span className="flex flex-col items-end">
              <span className="text-lg font-bold">${total.toFixed(2)} USD</span>
              <span className="text-sm text-muted">including VAT</span>
            </span>
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary md:text-base px-8 py-3"
        onClick={() => navigate('/checkout')} // go to checkout
        disabled={items.length === 0} // disable when cart empty
      >
        Check out
      </button>
    </div>
  );
};

export default CartSummary;
