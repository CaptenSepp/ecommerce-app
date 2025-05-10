import { Heart, Info, ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const iconClass = (isActive: boolean) =>
  `p-2 rounded-md transition ${
    isActive ? "bg-brand-navy text-white" : "hover:bg-gray-100"
  }`;

const NavbarIcons = () => {
  return (
    <div className="flex items-center gap-3">
      <NavLink
        to="/cart"
        className={({ isActive }) => iconClass(isActive)}
      >
        <ShoppingCart size={20} />
      </NavLink>
      <NavLink
        to="/wishlist"
        className={({ isActive }) => iconClass(isActive)}
      >
        <Heart size={20} />
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => iconClass(isActive)}
      >
        <Info size={20} />
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) => iconClass(isActive)}
      >
        <User size={20} />
      </NavLink>
    </div>
  );
};

export default NavbarIcons;
