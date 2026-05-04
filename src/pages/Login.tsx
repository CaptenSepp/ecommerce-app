import { useRef, useState } from "react"
import LoginField from "./login/LoginField"
import { focusRingClass, LoginFormErrors, LoginFormValues, validateLoginForm } from "./login/login-tools"

const LoginPage = () => {
  const [values, setValues] = useState<LoginFormValues>({ email: "", password: "" }) // form values
  const [errors, setErrors] = useState<LoginFormErrors>({}) // validation errors
  const [touched, setTouched] = useState<Partial<Record<keyof LoginFormValues, boolean>>>({}) // touched fields
  const emailInputRef = useRef<HTMLInputElement | null>(null) // focus first invalid input
  const passwordInputRef = useRef<HTMLInputElement | null>(null)
  const updateField = (field: keyof LoginFormValues, nextValue: string) => { const nextValues = { ...values, [field]: nextValue }; setValues(nextValues); if (touched[field]) setErrors(validateLoginForm(nextValues)) }
  const touchField = (field: keyof LoginFormValues) => { setTouched((previous) => ({ ...previous, [field]: true })); setErrors(validateLoginForm(values)) }

  return (
    <main className="login-wrapper">
      <div className="login-box">
        <form className="mt-6" onSubmit={(event) => { event.preventDefault(); const nextErrors = validateLoginForm(values); setErrors(nextErrors); setTouched({ email: true, password: true }); if (nextErrors.email) return emailInputRef.current?.focus(); if (nextErrors.password) return passwordInputRef.current?.focus() }} noValidate>
          <LoginField id="email" label="Email" value={values.email} inputRef={emailInputRef} onChange={(nextValue) => updateField("email", nextValue)} onBlur={() => touchField("email")} error={touched.email ? errors.email : undefined} describedBy="login-email-error" type="email" />
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block u-text-sm">Password</label>
              <a href="#" className="u-text-xs u-text-gray-600 hover:underline">Forget Password?</a>
            </div>
            <LoginField id="password" label="" value={values.password} inputRef={passwordInputRef} onChange={(nextValue) => updateField("password", nextValue)} onBlur={() => touchField("password")} error={touched.password ? errors.password : undefined} describedBy="login-password-error" type="password" />
          </div>
          <div className="mt-6"><button type="submit" className={`submit-button ${focusRingClass}`}>Sign In</button></div>
        </form>
        <div className="mt-4 flex items-center justify-between"><span className="w-1/5 border-b lg:w-1/5"></span><a href="#" className="u-text-xs text-center u-text-gray-500 uppercase hover:underline">or login with Social Media</a><span className="w-1/5 border-b lg:w-1/5"></span></div>
        <div className="mt-6 flex items-center -mx-2"><button type="button" className="social-button"><span className="mx-2 hidden sm:inline">Sign in with Google</span></button><a href="#" className="secondary-button mx-2"><svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"></svg></a></div>
        <p className="mt-8 text-center u-text-xs u-font-light u-text-gray-400">Don't have an account?<a href="#" className="u-font-medium u-text-gray-700 hover:underline"> Create One</a></p>
      </div>
    </main>
  )
}

export default LoginPage
