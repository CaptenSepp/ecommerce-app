import type { KeyboardEvent } from "react"
import { MessageCircle, X } from "lucide-react"
import type { AssistantMessage } from "./assistant-fab-tools"

type AssistantPanelProps = {
  draftText: string
  isOpen: boolean
  inputRef: React.RefObject<HTMLTextAreaElement | null>
  messages: AssistantMessage[]
  onClear: () => void
  onClose: () => void
  onDraftChange: (value: string) => void
  onSend: () => void
  onToggle: () => void
}

const AssistantPanel = ({ draftText, inputRef, isOpen, messages, onClear, onClose, onDraftChange, onSend, onToggle }: AssistantPanelProps) => (
  <div className="assistant-fab">
    <div id="assistant-panel" className={`assistant-panel ${isOpen ? "assistant-panel--open" : ""}`}>
      <div className="assistant-panel__header">
        <span className="assistant-panel__title">Assistant Demo</span>
        <div className="assistant-panel__actions">
          <button type="button" className="assistant-panel__text-btn" onClick={onClear}>Clear whole chat</button>
          <button type="button" className="assistant-panel__close" aria-label="Close assistant panel" onClick={onClose}><X size={16} /></button>
        </div>
      </div>
      <div className="assistant-panel__content">
        <div className="assistant-panel__messages">
          {messages.length === 0 ? <p className="u-text-sm text-muted">Demo chat. Messages stay in this browser.</p> : messages.map((messageItem) => (
            <div key={messageItem.id} className={`assistant-message assistant-message--${messageItem.role}`}>
              <span className="assistant-message__role">{messageItem.role === "user" ? "You" : "AI"}</span>
              <p className="assistant-message__text">{messageItem.text}</p>
            </div>
          ))}
        </div>
        <div className="assistant-panel__composer">
          {/* Enter sends the message, but Shift+Enter still creates a new line inside the textarea. */}
          <textarea ref={inputRef} className="assistant-panel__input" rows={1} value={draftText} placeholder="please write here" onChange={(event) => onDraftChange(event.target.value)} onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => { if (event.key !== "Enter" || event.shiftKey) return; event.preventDefault(); onSend() }} />
        </div>
      </div>
    </div>
    <button type="button" className="assistant-fab__btn" aria-expanded={isOpen} aria-controls="assistant-panel" onClick={onToggle}>
      <MessageCircle size={20} />
    </button>
  </div>
)

export default AssistantPanel
