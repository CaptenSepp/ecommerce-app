import { Heart, Info, MapPin, ShoppingCart } from "lucide-react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { RootState } from "@/app/store"
import { focusRingClass, getIconLinkClassName } from "./header-tools"
import LoginDrawer from "./LoginDrawer"

const NavbarIcons = ({ className = "" }: { className?: string }) => {
  const cartCount = useSelector((state: RootState) => state.cart.items.reduce((sum, item) => sum + (item.quantity ?? 0), 0)) // total cart quantity
  const wishCount = useSelector((state: RootState) => state.wishlist.items.length) // total wishlist count

  return (
    <div className={`header-icons-bar ${className}`.trim()}>
      <NavLink to="/retailers" aria-label="Open retailers map" className={({ isActive }) => `${getIconLinkClassName(isActive)} ${focusRingClass}`}><MapPin size={20} /></NavLink>
      <NavLink to="/cart" aria-label="Open cart" className={({ isActive }) => `${getIconLinkClassName(isActive)} ${focusRingClass}`}>
        <span className="relative inline-flex"><ShoppingCart size={20} />{cartCount > 0 && <span className="badge-counter">{cartCount}</span>}</span>
      </NavLink>
      <NavLink to="/wishlist" aria-label="Open wishlist" className={({ isActive }) => `${getIconLinkClassName(isActive)} ${focusRingClass}`}>
        <span className="relative inline-flex"><Heart size={20} />{wishCount > 0 && <span className="badge-counter">{wishCount}</span>}</span>
      </NavLink>
      <NavLink to="/about" aria-label="Open about page" className={({ isActive }) => `${getIconLinkClassName(isActive)} ${focusRingClass}`}><Info size={20} /></NavLink>
      <LoginDrawer />
    </div>
  )
}

export default NavbarIcons
