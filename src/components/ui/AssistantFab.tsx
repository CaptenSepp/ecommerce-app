import { useEffect, useRef, useState, type KeyboardEvent } from "react"; // local UI + browser persistence
import { MessageCircle, X } from "lucide-react"; // icon button labels

type AssistantMessage = { // simple chat message shape
  id: string
  role: "user" | "assistant"
  text: string
} // kept local because this is UI-only for now

const ASSISTANT_STORAGE_KEY = "assistant-chat-messages" // saved chat thread
const ASSISTANT_DRAFT_KEY = "assistant-chat-draft" // saved textarea draft

const createAssistantReply = (questionText: string) => `Saved in your browser: "${questionText}". AI backend reply will be connected later.` // placeholder until real API exists

const loadStoredMessages = () => { // safe browser read for saved chat
  try {
    const rawValue = localStorage.getItem(ASSISTANT_STORAGE_KEY) // load saved messages
    if (!rawValue) return [] as AssistantMessage[] // empty when nothing stored

    return JSON.parse(rawValue) as AssistantMessage[] // restore saved thread
  } catch {
    return [] as AssistantMessage[] // ignore broken storage
  }
}

const loadStoredDraft = () => { // safe browser read for draft text
  try {
    return localStorage.getItem(ASSISTANT_DRAFT_KEY) ?? "" // restore current input if any
  } catch {
    return "" // ignore storage problems
  }
}

const AssistantFab = () => { // floating assistant trigger
  const [isOpen, setIsOpen] = useState(false); // panel toggle
  const [draftText, setDraftText] = useState(""); // current textarea value
  const [messages, setMessages] = useState<AssistantMessage[]>([]); // saved chat history
  const inputRef = useRef<HTMLTextAreaElement | null>(null); // textarea ref for auto height

  useEffect(() => { // load saved browser state once on mount
    setMessages(loadStoredMessages()) // restore older messages
    setDraftText(loadStoredDraft()) // restore unfinished input
  }, [])

  useEffect(() => { // keep messages after browser refresh/close
    try {
      localStorage.setItem(ASSISTANT_STORAGE_KEY, JSON.stringify(messages)) // save whole thread
    } catch { // ignore storage quota failures
    }
  }, [messages])

  useEffect(() => { // keep current draft text too
    try {
      localStorage.setItem(ASSISTANT_DRAFT_KEY, draftText) // save textarea content
    } catch { // ignore storage quota failures
    }
  }, [draftText])

  useEffect(() => { // grow input upward when text becomes longer
    const textareaElement = inputRef.current // read current textarea once
    if (!textareaElement) return // stop if textarea is not mounted yet

    textareaElement.style.height = "0px" // reset first so shrink also works
    textareaElement.style.height = `${textareaElement.scrollHeight}px` // fit the full current content
  }, [draftText])

  const handleSend = () => { // add user line + fake assistant answer
    const trimmedText = draftText.trim() // avoid empty messages
    if (!trimmedText) return // stop on blank submit

    const nextMessages: AssistantMessage[] = [ // append both messages at once
      ...messages,
      { id: `user-${Date.now()}`, role: "user", text: trimmedText },
      { id: `assistant-${Date.now() + 1}`, role: "assistant", text: createAssistantReply(trimmedText) }
    ]

    setMessages(nextMessages) // save new conversation state
    setDraftText("") // clear input after send
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => { // Enter sends, Shift+Enter makes new line
    if (event.key !== "Enter" || event.shiftKey) return // keep normal typing for other keys

    event.preventDefault() // stop textarea from adding a new line
    handleSend() // send current draft text
  }

  const handleClear = () => { // quick way to reset saved chat
    setMessages([]) // clear visible messages
    setDraftText("") // clear current draft
  }

  return (
    <div className="assistant-fab"> {/* fixed wrapper */}
      <div id="assistant-panel" className={`assistant-panel ${isOpen ? "assistant-panel--open" : ""}`}> {/* drop-up panel */}
        <div className="assistant-panel__header"> {/* panel header */}
          <span className="assistant-panel__title">Assistant</span> {/* small title */}
          <div className="assistant-panel__actions"> {/* small top-right actions */}
            <button
              type="button"
              className="assistant-panel__text-btn"
              onClick={handleClear} // clear saved browser chat
            >
              Clear whole chat
            </button>
            <button
              type="button"
              className="assistant-panel__close"
              aria-label="Close assistant panel"
              onClick={() => setIsOpen(false)} // close panel
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="assistant-panel__content"> {/* inner layout for chat */}
          <div className="assistant-panel__messages"> {/* scroll area for thread */}
            {messages.length === 0 ? (
              <p className="u-text-sm text-muted">Write here. Messages stay in this browser.</p> /* empty-state hint */
            ) : (
              messages.map((messageItem) => (
                <div
                  key={messageItem.id}
                  className={`assistant-message assistant-message--${messageItem.role}`}
                >
                  <span className="assistant-message__role">{messageItem.role === "user" ? "You" : "AI"}</span>
                  <p className="assistant-message__text">{messageItem.text}</p>
                </div>
              ))
            )}
          </div>

          <div className="assistant-panel__composer"> {/* bottom input area */}
            <textarea
              ref={inputRef}
              className="assistant-panel__input"
              rows={1}
              value={draftText}
              placeholder="please write here"
              onChange={(event) => setDraftText(event.target.value)} // keep textarea synced
              onKeyDown={handleInputKeyDown} // support keyboard send only
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="assistant-fab__btn"
        aria-expanded={isOpen}
        aria-controls="assistant-panel"
        onClick={() => setIsOpen((prev) => !prev)} // toggle panel
      >
        <MessageCircle size={20} />
      </button>
    </div>
  );
};

export default AssistantFab;
