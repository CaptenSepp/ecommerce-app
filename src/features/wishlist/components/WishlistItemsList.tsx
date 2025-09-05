import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../app/store'
import { addToCart } from '../../features/cart/cartSlice'
import { toggleWishlist } from '../../features/wishlist/wishlistSlice'
import { Link } from 'react-router-dom'

const WishlistItemsList = () => {
  const dispatch = useAppDispatch()
  const items = useSelector((state: RootState) => state.wishlist.items)

  if (!items.length) {
    return (
      <div className="empty-state">Your wishlist is empty.</div>
    )
  }

  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 md:gap-6">
      {items.map((item) => (
        <div key={item.id} className="line-item">
          <Link to={`/products/${item.id}`} className="media-thumb">
            <img
              src={item.thumbnail}
              loading="lazy"
              alt={item.title}
              className="media-thumb__img"
            />
          </Link>

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
                className="btn btn-primary btn-sm"
                onClick={() => dispatch(addToCart(item))}
                aria-label={`Add ${item.title} to cart`}
              >
                Add to Cart
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => dispatch(toggleWishlist(item))}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WishlistItemsList
