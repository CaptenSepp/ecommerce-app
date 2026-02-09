import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react' // toast component and context helpers
type ToastKind = 'success' | 'info' | 'error' // supported toast types

type Toast = { // toast item shape
  id: string
  message: string
  kind: ToastKind
}

type ToastContextValue = { // context contract
  notify: (message: string, kind?: ToastKind) => void
}

const ToastContext = createContext<ToastContextValue | null>(null) // React context for toast actions

export const useToast = () => {
  const ctx = useContext(ToastContext) // hook enforces provider usage
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

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
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 8 }}> {/* fixed top-right stack */}
      {toasts.map(t => (
        <div
          key={t.id}
          role="status"
          style={{ // per-toast styling
            background: kindStyles[t.kind].bg,
            color: '#111',
            borderLeft: `4px solid ${kindStyles[t.kind].border}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: 8,
            padding: '10px 12px',
            minWidth: 240,
            maxWidth: 360,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ lineHeight: 1.2 }}>{t.message}</span>
          <button
            onClick={() => onClose(t.id)}
            aria-label="Close notification"
            style={{ background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', fontSize: 16 }} // minimal reset button styling
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

