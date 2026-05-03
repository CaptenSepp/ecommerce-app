import { createContext, useContext } from 'react' // React hooks for context management

type ToastKind = 'success' | 'info' | 'error' // toast types for UI variants

type Toast = { // toast payload shape
  id: string
  message: string
  kind: ToastKind
}

type ToastContextValue = { // context API
  notify: (message: string, kind?: ToastKind) => void
}

const ToastContext = createContext<ToastContextValue | null>(null) // shared context for toast actions

const useToast = () => {
  const ctx = useContext(ToastContext) // consume context in any component
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export type { Toast, ToastKind }
export { ToastContext, useToast } // expose context + hook for consumers
