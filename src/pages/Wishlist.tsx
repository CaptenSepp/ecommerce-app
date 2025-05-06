// src/pages/Wishlist.tsx
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

import { useDispatch } from 'react-redux'
import { clearWishlist } from '../features/wishlist/wishlistSlice';

const WishlistPage = () => {

  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  return (
    <div>
      <h1>Wishlist</h1>
      {wishlist.length === 0 ? <p>No items yet.</p> : (
        <ul>
          {wishlist.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
      {wishlist.length > 0 && (
        <button onClick={() => dispatch(clearWishlist())}>
          clear the wishlist
        </button>
      )}
    </div>
  );
}
export default WishlistPage
