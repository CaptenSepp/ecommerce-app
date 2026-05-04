import { useRef, useState } from "react"
import { CheckoutFormErrors, CheckoutFormValues, focusRingClass, validateCheckoutForm } from "./checkout-tools"

type CheckoutFormProps = {
  hasItems: boolean
  initialValues: CheckoutFormValues
  onSubmit: (values: CheckoutFormValues) => Promise<void>
}

const CheckoutForm = ({ hasItems, initialValues, onSubmit }: CheckoutFormProps) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<CheckoutFormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof CheckoutFormValues, boolean>>>({})
  const nameInputRef = useRef<HTMLInputElement | null>(null)
  const emailInputRef = useRef<HTMLInputElement | null>(null)
  const addressInputRef = useRef<HTMLTextAreaElement | null>(null)

  // Update one field and revalidate only after the user has already interacted with that field.
  // This avoids showing error text too early while still giving feedback after the first touch.
  const updateField = (field: keyof CheckoutFormValues, nextValue: string) => {
    const nextValues = { ...values, [field]: nextValue }
    setValues(nextValues)
    if (touched[field]) setErrors(validateCheckoutForm(nextValues, hasItems)) // revalidate after touch
  }

  // A field becomes "touched" after the user leaves it once.
  // That flag is what allows the matching error message to appear.
  const touchField = (field: keyof CheckoutFormValues) => {
    setTouched((previous) => ({ ...previous, [field]: true }))
    setErrors(validateCheckoutForm(values, hasItems))
  }

  // If submit fails validation, move focus to the first broken field
  // so the next step is obvious for keyboard and screen-reader users.
  const focusFirstError = (nextErrors: CheckoutFormErrors) => {
    if (nextErrors.name) nameInputRef.current?.focus()
    else if (nextErrors.email) emailInputRef.current?.focus()
    else if (nextErrors.address) addressInputRef.current?.focus()
  }

  return (
    // Submit validates the whole form at once and only calls the parent when everything is valid.
    <form onSubmit={async (event) => { event.preventDefault(); const nextErrors = validateCheckoutForm(values, hasItems); setErrors(nextErrors); setTouched({ name: true, email: true, address: true }); if (Object.keys(nextErrors).length > 0) return focusFirstError(nextErrors); await onSubmit(values) }} className="space-y-4" noValidate>
      {errors.form ? <p className="u-text-sm u-text-danger" role="alert">{errors.form}</p> : null}
      <div>
        <label htmlFor="checkout-name" className="mb-1 block u-text-sm">Full name</label>
        <input id="checkout-name" ref={nameInputRef} className={`input-field ${focusRingClass} ${touched.name && errors.name ? "input-field-error" : ""}`} value={values.name} onChange={(event) => updateField("name", event.target.value)} onBlur={() => touchField("name")} aria-invalid={Boolean(touched.name && errors.name)} aria-describedby={touched.name && errors.name ? "checkout-name-error" : undefined} />
        {touched.name && errors.name ? <p id="checkout-name-error" className="mt-1 u-text-sm u-text-danger" role="alert">{errors.name}</p> : null}
      </div>
      <div>
        <label htmlFor="checkout-email" className="mb-1 block u-text-sm">Email</label>
        <input id="checkout-email" ref={emailInputRef} type="email" className={`input-field ${focusRingClass} ${touched.email && errors.email ? "input-field-error" : ""}`} value={values.email} onChange={(event) => updateField("email", event.target.value)} onBlur={() => touchField("email")} aria-invalid={Boolean(touched.email && errors.email)} aria-describedby={touched.email && errors.email ? "checkout-email-error" : undefined} />
        {touched.email && errors.email ? <p id="checkout-email-error" className="mt-1 u-text-sm u-text-danger" role="alert">{errors.email}</p> : null}
      </div>
      <div>
        <label htmlFor="checkout-address" className="mb-1 block u-text-sm">Address</label>
        <textarea id="checkout-address" ref={addressInputRef} className={`input-field ${focusRingClass} ${touched.address && errors.address ? "input-field-error" : ""}`} value={values.address} onChange={(event) => updateField("address", event.target.value)} onBlur={() => touchField("address")} aria-invalid={Boolean(touched.address && errors.address)} aria-describedby={touched.address && errors.address ? "checkout-address-error" : undefined} rows={3} />
        {touched.address && errors.address ? <p id="checkout-address-error" className="mt-1 u-text-sm u-text-danger" role="alert">{errors.address}</p> : null}
      </div>
      <button type="submit" className={`btn btn-primary ${focusRingClass}`}>Place Order</button>
    </form>
  )
}

export default CheckoutForm
