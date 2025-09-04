import { Heart, Info, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import LoginDrawer from "./LoginDrawer";

const getIconLinkClassName = (isActive: boolean) =>
  `p-2 rounded-md transition ${isActive ? "bg-brand-navy text-white" : "hover:bg-gray-100"}`;

const NavbarIcons = () => {
  return (
    <div className="flex items-center gap-3">
      <NavLink
        to="/cart"
        className={({ isActive }) => getIconLinkClassName(isActive)}
      >
        <ShoppingCart size={20} />
      </NavLink>
      <NavLink
        to="/wishlist"
        className={({ isActive }) => getIconLinkClassName(isActive)}
      >
        <Heart size={20} />
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => getIconLinkClassName(isActive)}
      >
        <Info size={20} />
      </NavLink>
      {/* <NavLink
        to="/login"
        className={({ isActive }) => iconClass(isActive)}
      >
        <User size={20} />
      </NavLink> */}
      <LoginDrawer />
    </div>
  );
};

export default NavbarIcons;
