import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store/store'
import { addToCart, removeFromCart, updateQuantity } from '../../features/cart/cartSlice'

const CartItemsList = () => {
  const dispatch = useAppDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  if (!items.length) {
    return (
      <div className="text-center text-[color:var(--text-muted)]">Your cart is empty.</div>
    );
  }

  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 md:gap-6">
      {items.map((item) => (
        <div key={item.id} className="flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6 p-2">
          <div className="group relative block h-48 w-32 overflow-hidden bg-gray-100 sm:h-56 sm:w-40 rounded-md">
            <img
              src={item.thumbnail}
              loading="lazy"
              alt={item.title}
              className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between py-2">
            <div>
              <div className="mb-1 text-lg font-bold text-brand-black lg:text-xl">
                {item.title}
              </div>
              <span className="block text-[color:var(--text-muted)]">{item.brand}</span>
            </div>

            <div>
              <span className="mb-1 block font-bold text-brand-black md:text-lg">${item.price}</span>
              <span className="block text-sm text-[color:var(--text-muted)]">In stock</span>
            </div>
          </div>

          <div className="flex w-full justify-between border-t p-4 sm:w-auto sm:border-none sm:pl-0 lg:p-6 lg:pl-0">
            <div className="flex items-center gap-2">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  const q = item.quantity - 1;
                  if (q <= 0) {
                    dispatch(removeFromCart(item.id));
                  } else {
                    dispatch(updateQuantity({ id: item.id, quantity: q }));
                  }
                }}
                aria-label={`Decrease quantity of ${item.title}`}
              >
                -
              </button>
              <span className="min-w-8 text-center">{item.quantity}</span>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => dispatch(addToCart(item))}
                aria-label={`Increase quantity of ${item.title}`}
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="block font-bold text-brand-black md:text-lg">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemsList;

