export { focusRingClass } from "@/components/ui/focus-tools"

export const announcementMessages = [
  "Free delivery on qualifying orders",
  "30-day returns on eligible products",
  "Save the planet with our products",
] // simple rotating header lines

export const getNavLinkClassName = (isActive: boolean) =>
  `nav-link${isActive ? " nav-link-active" : ""}` // main nav active helper

export const getIconLinkClassName = (isActive: boolean) =>
  `icon-button header-icons-bar__link transition cursor-pointer ${
    isActive ? "u-text-white" : "text-brand-orange"
  }` // shared icon button helper
