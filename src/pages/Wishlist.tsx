// src/pages/Wishlist.tsx
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const WishlistPage = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist.items)

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
    </div>
  )
}
export default WishlistPage
