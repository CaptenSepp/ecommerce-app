import { NavLink } from "react-router-dom"
import logoUrl from "@/assets/logos/app-logo.png"

const Logo = () => (
  <div className="flex shrink-0 items-center justify-center px-1 py-2 sm:p-4">
    <NavLink to="/" end className="block shrink-0 transition-opacity duration-200 hover:opacity-60">
      <img src={logoUrl} alt="Shopella home" className="block h-10 w-auto shrink-0 sm:h-12" />
    </NavLink>
  </div>
)

export default Logo
