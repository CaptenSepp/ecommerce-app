import { useEffect, useRef, useState } from "react"

export const useHeaderDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false) // track drawer state
  const openButtonRef = useRef<HTMLButtonElement | null>(null) // restore focus on close

  // Only listen for Escape while the drawer is open.
  // This keeps the global keyboard listener short-lived and easier to follow.
  useEffect(() => {
    if (!isDrawerOpen) return // no listener when closed

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDrawerOpen(false) // quick close with Escape
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown) // cleanup listener
  }, [isDrawerOpen])

  // Put focus back on the opener after close so keyboard users do not lose their place.
  useEffect(() => {
    if (!isDrawerOpen) openButtonRef.current?.focus() // return focus to opener
  }, [isDrawerOpen])

  return {
    isDrawerOpen,
    openButtonRef,
    closeDrawer: () => setIsDrawerOpen(false), // shared close helper
    openDrawer: () => setIsDrawerOpen(true), // shared open helper
  }
}
