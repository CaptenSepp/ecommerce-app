export const focusRingClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2" // Reuse the same visible focus style so keyboard navigation stays clear across the whole checkout flow.

export const CUSTOMER_STORAGE_KEY = "checkout-customer-session" // Keep the storage key in one place so load and save always point to the same session data.

export type CheckoutFormValues = {
  name: string
  email: string
  address: string
}

export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormValues | "form", string>>

export const emptyCheckoutFormValues: CheckoutFormValues = {
  name: "",
  email: "",
  address: "",
} // Use a full empty object so the form always receives the same shape, even when nothing was saved before.

export const loadStoredCustomer = (): CheckoutFormValues => {
  // Skip sessionStorage access outside the browser so this helper fails safely in non-DOM environments.
  if (typeof window === "undefined") return emptyCheckoutFormValues
  try {
    const rawValue = window.sessionStorage.getItem(CUSTOMER_STORAGE_KEY)
    // If this is the user's first checkout in the tab, return the safe empty form values instead.
    if (!rawValue) return emptyCheckoutFormValues
    return { ...emptyCheckoutFormValues, ...(JSON.parse(rawValue) as Partial<CheckoutFormValues>) }
  } catch {
    // Bad JSON or blocked storage should not break the checkout screen, so fall back to empty values.
    return emptyCheckoutFormValues
  }
}

export const saveStoredCustomer = (customer: CheckoutFormValues) => {
  // Saving only makes sense in the browser because sessionStorage is a browser API.
  if (typeof window === "undefined") return
  try {
    window.sessionStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customer))
  } catch {
    // If storage is full or blocked, checkout should still continue instead of crashing.
  }
}

export const validateCheckoutForm = (values: CheckoutFormValues, hasItems: boolean): CheckoutFormErrors => {
  const errors: CheckoutFormErrors = {}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // This is only a basic format check to catch obvious mistakes before submit.
  const name = values.name.trim()
  const email = values.email.trim()
  const address = values.address.trim()

  // Keep all validation here so the form and submit flow use one consistent source of truth.
  if (!hasItems) errors.form = "Your cart is empty."
  if (!name) errors.name = "Full name is required."
  else if (name.length < 2) errors.name = "Full name must be at least 2 characters."
  if (!email) errors.email = "Email is required."
  else if (!emailRegex.test(email)) errors.email = "Enter a valid email address."
  if (!address) errors.address = "Address is required."
  else if (address.length < 8) errors.address = "Address must be at least 8 characters."
  return errors
}
