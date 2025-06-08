import { NavLink } from "react-router-dom";

const navClass = (isActive: boolean) =>
  `nav-link${isActive ? " nav-link-active" : ""}`;

const NavbarCategories = () => {
  return (
    <div>
      <NavLink
        to="/products"
        className={({ isActive }) => navClass(isActive)}
      >
        Products
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) => navClass(isActive)}
      >
        Products
      </NavLink>

      <NavLink to="/alt-products" className={({ isActive }) => navClass(isActive)}>
        Alt Products
      </NavLink>
    </div>
  );
};

export default NavbarCategories;
