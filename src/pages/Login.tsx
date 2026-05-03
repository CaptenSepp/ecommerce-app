import { useRef, useState } from "react";

const focusRingClass = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"; // visible keyboard focus

type LoginFormValues = { // form model for validation
  email: string;
  password: string;
};

type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>; // field-level errors

const validateLoginForm = (values: LoginFormValues): LoginFormErrors => { // central validation layer
  const errors: LoginFormErrors = {};
  const email = values.email.trim(); // ignore outer spaces
  const password = values.password; // keep raw password
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple practical email check

  if (!email) errors.email = "Email is required.";
  else if (!emailRegex.test(email)) errors.email = "Enter a valid email address.";

  if (!password.trim()) errors.password = "Password is required."; // edge case: only spaces
  else if (password.length < 8) errors.password = "Password must be at least 8 characters.";

  return errors;
};

const LoginPage = () => { // basic login form with controlled inputs
  const [email, setEmail] = useState(""); // track email text
  const [password, setPassword] = useState(""); // track password text
  const [errors, setErrors] = useState<LoginFormErrors>({}); // current validation errors
  const [touched, setTouched] = useState<Partial<Record<keyof LoginFormValues, boolean>>>({}); // tracks interacted fields
  const emailInputRef = useRef<HTMLInputElement | null>(null); // focus target for invalid email
  const passwordInputRef = useRef<HTMLInputElement | null>(null); // focus target for invalid password

  const handleSubmit = (e: React.FormEvent) => { // submit handler placeholder, auth request would go here
    e.preventDefault(); // prevent full page reload
    const nextErrors = validateLoginForm({ email, password }); // validate on submit
    setErrors(nextErrors);
    setTouched({ email: true, password: true }); // show all field errors after submit
    if (Object.keys(nextErrors).length > 0) { // focus first invalid field for keyboard users
      if (nextErrors.email) emailInputRef.current?.focus();
      else if (nextErrors.password) passwordInputRef.current?.focus();
      return; // block submit when invalid
    }
  };

  return (
    <main className="login-wrapper">
      <div className="login-box">
        <div className="flex justify-center mx-auto">
        </div>

        <form className="mt-6" onSubmit={handleSubmit} noValidate> {/* form wrapper with custom validation */}
          <div>
            <label htmlFor="email" className="block u-text-sm">Email</label>
            <input
              type="email"
              ref={emailInputRef}
              className={`input-field ${focusRingClass} ${touched.email && errors.email ? "border-red-500" : ""}`}
              id="email"
              value={email}
              onChange={e => { // update + revalidate after user touched field
                const next = e.target.value;
                setEmail(next);
                if (touched.email) setErrors(validateLoginForm({ email: next, password }));
              }}
              onBlur={() => { // mark touched and validate
                setTouched(prev => ({ ...prev, email: true }));
                setErrors(validateLoginForm({ email, password }));
              }}
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby={touched.email && errors.email ? "login-email-error" : undefined}
            />
            {touched.email && errors.email ? <p id="login-email-error" className="mt-1 u-text-sm u-text-danger" role="alert">{errors.email}</p> : null}
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block u-text-sm">Password</label>
              <a href="#" className="u-text-xs u-text-gray-600 hover:underline">Forget Password?</a>
            </div>
            <input
              type="password"
              ref={passwordInputRef}
              className={`input-field ${focusRingClass} ${touched.password && errors.password ? "border-red-500" : ""}`}
              id="password"
              value={password}
              onChange={e => { // update + revalidate after user touched field
                const next = e.target.value;
                setPassword(next);
                if (touched.password) setErrors(validateLoginForm({ email, password: next }));
              }}
              onBlur={() => { // mark touched and validate
                setTouched(prev => ({ ...prev, password: true }));
                setErrors(validateLoginForm({ email, password }));
              }}
              aria-invalid={Boolean(touched.password && errors.password)}
              aria-describedby={touched.password && errors.password ? "login-password-error" : undefined}
            />
            {touched.password && errors.password ? <p id="login-password-error" className="mt-1 u-text-sm u-text-danger" role="alert">{errors.password}</p> : null}
          </div>

          <div className="mt-6">
            <button type="submit" className={`submit-button ${focusRingClass}`}>Sign In</button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b lg:w-1/5"></span>
          <a href="#" className="u-text-xs text-center u-text-gray-500 uppercase hover:underline">
            or login with Social Media
          </a>
          <span className="w-1/5 border-b lg:w-1/5"></span>
        </div>

        <div className="flex items-center mt-6 -mx-2">
          <button type="button" className="social-button">
            <span className="hidden mx-2 sm:inline">Sign in with Google</span>
          </button>

          <a href="#" className="secondary-button mx-2">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"></svg>
          </a>
        </div>

        <p className="mt-8 u-text-xs u-font-light text-center u-text-gray-400">
          Don't have an account?
          <a href="#" className="u-font-medium u-text-gray-700 hover:underline"> Create One</a>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
