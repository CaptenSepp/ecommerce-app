// src/pages/Wishlist.tsx — renders the wishlist page (view) using items from the store (state)
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store'
import { clearWishlist } from '@/features/wishlist/wishlistSlice'
import WishlistItemsList from '@/features/wishlist/components/WishlistItemsList'

const WishlistPage = () => {
  const dispatch = useDispatch() // to send actions like clear (dispatch)
  const wishlist = useSelector((state: RootState) => state.wishlist.items) // read wishlist items (selector)

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-lg px-4 md:px-8">
        <div className="mb-6 sm:mb-10 lg:mb-16 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">Your Wishlist</h2>
          {wishlist.length > 0 && (
            <button className='btn btn-secondary btn-sm' onClick={() => dispatch(clearWishlist())}>
              Clear Wishlist
            </button>
          )}
        </div>

        <WishlistItemsList />
      </div>
    </div>
  )
}

export default WishlistPage
