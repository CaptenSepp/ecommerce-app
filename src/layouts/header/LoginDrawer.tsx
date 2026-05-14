import { User } from "lucide-react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { RootState } from "@/app/store"
import LoginPage from "@/features/auth/pages/Login"
import { focusRingClass, getIconLinkClassName } from "./header-tools"
import { useHeaderDrawer } from "./use-header-drawer"

const LoginDrawer = () => {
  const { isDrawerOpen, openButtonRef, openDrawer, closeDrawer } = useHeaderDrawer() // shared drawer behavior
  const user = useSelector((state: RootState) => state.auth.user) // read signed-in user
  const shortName = user?.name.trim().slice(0, 6) // keep label small under the icon

  return (
    <>
      <button
        type="button"
        ref={openButtonRef}
        onClick={openDrawer}
        className={`${getIconLinkClassName(isDrawerOpen)} ${focusRingClass}`}
        aria-pressed={isDrawerOpen}
        aria-haspopup="dialog"
        aria-controls="login-drawer"
        aria-label="Open login drawer"
      >
        <span className="flex flex-col items-center justify-center leading-none">
          <User size={20} />
          {shortName ? <span className="mt-1 max-w-12 truncate text-[10px] font-medium">{shortName}</span> : null}
        </span>
      </button>

      {isDrawerOpen && <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs" onClick={closeDrawer} />}

      <aside
        id="login-drawer"
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-white shadow-lg transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button type="button" onClick={closeDrawer} className={`absolute right-4 top-4 u-text-2xl ${focusRingClass}`} aria-label="Close login drawer">×</button>
        <div className="space-y-4 p-6">
          <LoginPage onSuccess={closeDrawer} />
          <div>
            <NavLink to={user ? "/account" : "/login"} className={`btn btn-primary btn-sm ${focusRingClass}`} onClick={closeDrawer}>
              {user ? "Open Account" : "Open Login Page"}
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  )
}

export default LoginDrawer
