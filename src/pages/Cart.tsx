// src/pages/Cart.tsx
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { clearCart, removeFromCart, updateQuantity } from '../features/cart/cartSlice'

const CartPage = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state: RootState) => state.cart.items)

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? <p>No items in cart</p> : (
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.title} - ${item.price} x
              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={e => dispatch(updateQuantity({ id: item.id, quantity: +e.target.value }))}
              />
              <button className='btn btn-secondary btn-sm' onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button className='btn btn-primary btn-sm' onClick={() => dispatch(clearCart())}>
          clear the cart
        </button>
      )}
    </div>
  )
}
export default CartPage
