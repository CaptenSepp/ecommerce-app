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

          {/* Keep the white text navigation as the flexible top-row area. */}
          <div className="flex min-w-0 flex-1 self-stretch items-stretch">
            <NavbarCategories />
          </div>

          {/* Push the icon buttons to the far right on desktop. */}
          <NavbarIcons className="hidden self-stretch md:ml-auto md:flex" />
        </div>
      </div>
    </header>

    {/* Reuse the existing mobile bottom-bar class name. */}
    <NavbarIcons className="header-icons-bar--mobile md:hidden" />
  </div>
)

export default Header
