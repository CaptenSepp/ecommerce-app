import AnnouncementStrip from "./header/AnnouncementStrip"
import Logo from "./header/Logo"
import NavbarCategories from "./header/NavbarCategories"
import NavbarIcons from "./header/NavbarIcons"

const Header = () => (
  <div>
    <header className="header">
      <AnnouncementStrip />
      <div className="header__main">
        <div className="header__items">
          <Logo />
          <NavbarCategories />
          <NavbarIcons className="hidden md:flex" />
        </div>
      </div>
    </header>
    <NavbarIcons className="mobile-nav-bar--mobile md:hidden" />
  </div>
)

export default Header
