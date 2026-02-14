import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'
import { addToCart, removeFromCart, updateQuantity } from '@/features/cart/cartSlice'

const CartItemsList = () => {
  const dispatch = useAppDispatch(); // dispatch actions
  const items = useSelector((state: RootState) => state.cart.items); // cart items

  if (!items.length) { // empty state
    return (
      <div className="empty-state">Your cart is empty.</div>
    );
  }

  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 md:gap-6">
      {items.map((item) => ( // render cart items
        <div key={item.id} className="line-item">
          <div className="media-thumb">
            <img
              src={item.thumbnail}
              loading="lazy" // lazy-load thumbnail
              alt={item.title}
              className="media-thumb__img"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between py-2">
            <div>
              <div className="item-title">
                {item.title}
              </div>
              <span className="item-brand">{item.brand}</span>
            </div>

            <div>
              <span className="item-price">${item.price}</span>
              <span className="stock-note">In stock</span>
            </div>
          </div>

          <div className="line-item__actions">
            <div className="flex items-center gap-2">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  const q = item.quantity - 1;
                  if (q <= 0) {
                    dispatch(removeFromCart(item.id)); // remove item when quantity hits zero
                  } else {
                    dispatch(updateQuantity({ id: item.id, quantity: q })); // decrease quantity
                  }
                }}
                aria-label={`Decrease quantity of ${item.title}`}
              >
                -
              </button>
              <span className="min-w-8 text-center">{item.quantity}</span>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => dispatch(addToCart(item))} // increase quantity
                aria-label={`Increase quantity of ${item.title}`}
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="block u-font-bold text-brand-black u-text-lg-md">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => dispatch(removeFromCart(item.id))} // remove item
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

