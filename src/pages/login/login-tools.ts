export const focusRingClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2" // shared keyboard focus

export type LoginFormValues = {
  email: string
  password: string
}

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>

export const validateLoginForm = (values: LoginFormValues): LoginFormErrors => {
  const errors: LoginFormErrors = {}
  const email = values.email.trim() // ignore outer spaces
  const password = values.password // keep raw password
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // simple email check

  if (!email) errors.email = "Email is required."
  else if (!emailRegex.test(email)) errors.email = "Enter a valid email address."
  if (!password.trim()) errors.password = "Password is required."
  else if (password.length < 8) errors.password = "Password must be at least 8 characters."
  return errors
}
