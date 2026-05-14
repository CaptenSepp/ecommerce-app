import { focusRingClass } from "../login-tools"

type LoginFieldProps = {
  describedBy?: string
  error?: string
  id: string
  label: string
  type?: string
  value: string
  inputRef?: React.RefObject<HTMLInputElement | null>
  onBlur: () => void
  onChange: (value: string) => void
}

const LoginField = ({ describedBy, error, id, inputRef, label, onBlur, onChange, type = "text", value }: LoginFieldProps) => (
  <div>
    {label ? <label htmlFor={id} className="block u-text-sm">{label}</label> : null}
    <input id={id} ref={inputRef} type={type} className={`input-field ${focusRingClass} ${error ? "input-field-error" : ""}`} value={value} onChange={(event) => onChange(event.target.value)} onBlur={onBlur} aria-invalid={Boolean(error)} aria-describedby={error ? describedBy : undefined} />
    {error ? <p id={describedBy} className="mt-1 u-text-sm u-text-danger" role="alert">{error}</p> : null}
  </div>
)

export default LoginField
