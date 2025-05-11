import Logo from "./Logo";
import NavbarCategories from "./NavbarCategories";
import NavbarIcons from "./NavbarIcons";

const Header = () => {
  return (
    <div className="border-b border-black">
      <header className="header">
        <div className="header__items">
          <Logo />

          <NavbarCategories />

          <NavbarIcons />
        </div>
      </header>
    </div>
  );
};

export default Header;
