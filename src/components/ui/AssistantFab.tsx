import { useEffect, useRef, useState } from "react"
import AssistantPanel from "./AssistantPanel"
import { ASSISTANT_DRAFT_KEY, ASSISTANT_STORAGE_KEY, createAssistantReply, loadStoredDraft, loadStoredMessages, type AssistantMessage } from "./assistant-fab-tools"

const AssistantFab = () => {
  const [isOpen, setIsOpen] = useState(false) // panel open state
  const [draftText, setDraftText] = useState("") // current textarea value
  const [messages, setMessages] = useState<AssistantMessage[]>([]) // saved chat messages
  const inputRef = useRef<HTMLTextAreaElement | null>(null) // auto-grow textarea ref

  // Restore the last saved thread and draft once so a refresh does not wipe the local assistant UI.
  useEffect(() => { setMessages(loadStoredMessages()); setDraftText(loadStoredDraft()) }, []) // restore saved browser state

  // Save the conversation and the unfinished draft separately.
  // This keeps both the sent messages and half-written input after reload.
  useEffect(() => { try { localStorage.setItem(ASSISTANT_STORAGE_KEY, JSON.stringify(messages)) } catch {} }, [messages]) // keep thread saved
  useEffect(() => { try { localStorage.setItem(ASSISTANT_DRAFT_KEY, draftText) } catch {} }, [draftText]) // keep draft saved

  // Reset the height first, then grow to the real content height.
  // That allows the textarea to shrink again after text is removed.
  useEffect(() => { const textareaElement = inputRef.current; if (!textareaElement) return; textareaElement.style.height = "0px"; textareaElement.style.height = `${textareaElement.scrollHeight}px` }, [draftText]) // grow input with content

  return (
    <AssistantPanel
      draftText={draftText}
      inputRef={inputRef}
      isOpen={isOpen}
      messages={messages}
      onClear={() => { setMessages([]); setDraftText("") }}
      onClose={() => setIsOpen(false)}
      onDraftChange={setDraftText}
      onSend={() => {
        const trimmedText = draftText.trim()
        if (!trimmedText) return // skip blank messages

        // Add the user message and placeholder reply in one state update
        // so the chat list stays consistent after a single send action.
        setMessages((previous) => [...previous, { id: `user-${Date.now()}`, role: "user", text: trimmedText }, { id: `assistant-${Date.now() + 1}`, role: "assistant", text: createAssistantReply(trimmedText) }])
        setDraftText("")
      }}
      onToggle={() => setIsOpen((previous) => !previous)}
    />
  )
}

export default AssistantFab
