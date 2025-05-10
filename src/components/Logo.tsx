import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <NavLink
      to="/"
      end
    >
      <img
        src="../src/assets/logos/logo.svg"
        alt="Home"
        className="header__logo__img"
      />
    </NavLink>
  );
};

export default Logo;
