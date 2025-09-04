import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <NavLink
        to="/"
        end
        className="hover:opacity-60 transition-opacity duration-200"
      >
        <img
          src="../src/assets/logos/logo.svg"
          alt="Home"
          className="h-12"
        />
      </NavLink>
    </div>
  );
};

export default Logo;
