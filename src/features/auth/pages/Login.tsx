import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/app/store"
import { setUser } from "@/features/auth/authSlice"
import LoginField from "../components/LoginField"
import { focusRingClass, LoginFormErrors, LoginFormValues, validateLoginForm } from "../login-tools"

type LoginPageProps = {
  onSuccess?: () => void
}

const LoginPage = ({ onSuccess }: LoginPageProps) => {
  const dispatch = useAppDispatch() // save demo user in redux
  const navigate = useNavigate() // move user after sign in
  const [values, setValues] = useState<LoginFormValues>({ name: "", email: "" }) // form values
  const [errors, setErrors] = useState<LoginFormErrors>({}) // validation errors
  const [isSubmitting, setIsSubmitting] = useState(false) // fake request state
  const [touched, setTouched] = useState<Partial<Record<keyof LoginFormValues, boolean>>>({}) // touched fields
  const nameInputRef = useRef<HTMLInputElement | null>(null) // focus first invalid input
  const emailInputRef = useRef<HTMLInputElement | null>(null) // focus first invalid input
  const updateField = (field: keyof LoginFormValues, nextValue: string) => { const nextValues = { ...values, [field]: nextValue }; setValues(nextValues); if (touched[field]) setErrors(validateLoginForm(nextValues)) }
  const touchField = (field: keyof LoginFormValues) => { setTouched((previous) => ({ ...previous, [field]: true })); setErrors(validateLoginForm(values)) }
  const submitLogin = async () => {
    const nextErrors = validateLoginForm(values) // validate current form values
    setErrors(nextErrors)
    setTouched({ name: true, email: true })
    if (nextErrors.name) return nameInputRef.current?.focus()
    if (nextErrors.email) return emailInputRef.current?.focus()

    setIsSubmitting(true) // simulate a small login request
    await new Promise((resolve) => window.setTimeout(resolve, 900))
    dispatch(setUser({
      id: values.email.trim().toLowerCase(), // stable demo id from email
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
    }))
    onSuccess?.() // close drawer when login came from it
    navigate("/account") // move signed-in user to account page
  }

  return (
    <main className="login-wrapper">
      <div className="login-box">
        <p className="login-box__note">Demo sign-in stores this user in your browser.</p>
        <form className="mt-6" onSubmit={async (event) => { event.preventDefault(); if (isSubmitting) return; try { await submitLogin() } finally { setIsSubmitting(false) } }} noValidate>
          <LoginField id="name" label="Name" value={values.name} inputRef={nameInputRef} onChange={(nextValue) => updateField("name", nextValue)} onBlur={() => touchField("name")} error={touched.name ? errors.name : undefined} describedBy="login-name-error" />
          <LoginField id="email" label="Email" value={values.email} inputRef={emailInputRef} onChange={(nextValue) => updateField("email", nextValue)} onBlur={() => touchField("email")} error={touched.email ? errors.email : undefined} describedBy="login-email-error" type="email" />
          <div className="mt-6"><button type="submit" className={`submit-button ${focusRingClass}`} disabled={isSubmitting}>{isSubmitting ? "Signing In..." : "Sign In"}</button></div>
        </form>
      </div>
    </main>
  )
}

export default LoginPage
