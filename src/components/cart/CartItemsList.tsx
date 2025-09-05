import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store/store'
import { addToCart, removeFromCart, updateQuantity } from '../../features/cart/cartSlice'

const CartItemsList = () => {
  const dispatch = useAppDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  if (!items.length) {
    return (
      <div className="empty-state">Your cart is empty.</div>
    );
  }

  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 md:gap-6">
      {items.map((item) => (
        <div key={item.id} className="line-item">
          <div className="media-thumb">
            <img
              src={item.thumbnail}
              loading="lazy"
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

