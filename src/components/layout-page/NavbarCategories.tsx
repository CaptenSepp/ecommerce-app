import { NavLink } from "react-router-dom";

const getNavLinkClassName = (isActive: boolean) =>
  `nav-link${isActive ? " nav-link-active" : ""}`;

const NavbarCategories = () => {
  return (
    <div>
      <NavLink
        to="/products"
        className={({ isActive }) => getNavLinkClassName(isActive)}
      >
        Products
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) => getNavLinkClassName(isActive)}
      >
        Products
      </NavLink>

      <NavLink to="/alt-products" className={({ isActive }) => getNavLinkClassName(isActive)}>
        Alt Products
      </NavLink>
    </div>
  );
};

export default NavbarCategories;
