import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Toast, ToastContext, ToastKind } from './toastContext'

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]) // active toast list
  const timers = useRef<Map<string, number | ReturnType<typeof setTimeout>>>(new Map()) // timers for auto-dismiss

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id)) // remove toast by id
    const t = timers.current.get(id)
    if (t) {
      clearTimeout(t as number) // clear pending timeout
      timers.current.delete(id)
    }
  }, [])

  const notify = useCallback((message: string, kind: ToastKind = 'info') => {
    const id = Math.random().toString(36).slice(2) // generate a small unique id
    setToasts(prev => [...prev, { id, message, kind }]) // enqueue new toast
    const timer = setTimeout(() => remove(id), 3000) // auto-dismiss after 3s
    timers.current.set(id, timer)
  }, [remove])

  const value = useMemo(() => ({ notify }), [notify]) // memoized context value

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={remove} /> {/* render toast list at root */}
    </ToastContext.Provider>
  )
}

const kindStyles: Record<ToastKind, { bg: string; border: string }> = { // visual styles by toast kind
  success: { bg: '#ecfdf5', border: '#10b981' },
  info: { bg: '#eff6ff', border: '#3b82f6' },
  error: { bg: '#fef2f2', border: '#ef4444' },
}

const ToastContainer: React.FC<{ toasts: Toast[]; onClose: (id: string) => void }> = ({ toasts, onClose }) => {
  return (
    <div className="toast-stack"> {/* Keep all toasts in one fixed stack near the top-right corner. */}
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  )
}

const ToastItem: React.FC<{ toast: Toast; onClose: (id: string) => void }> = ({ toast, onClose }) => {
  const kindStyle = kindStyles[toast.kind] // Read the color pair once so the JSX below stays simple.

  return (
    <div
      role="status"
      className="toast-item"
      style={{ '--toast-bg': kindStyle.bg, '--toast-border': kindStyle.border } as React.CSSProperties}
    >
      <span className="toast-item__message">{toast.message}</span>
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        aria-label="Close notification"
        className="toast-item__close"
      >
        ×
      </button>
    </div>
  )
}
