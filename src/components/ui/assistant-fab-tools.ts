export type AssistantMessage = {
  id: string
  role: "user" | "assistant"
  text: string
}

export const ASSISTANT_STORAGE_KEY = "assistant-chat-messages" // saved thread key
export const ASSISTANT_DRAFT_KEY = "assistant-chat-draft" // saved draft key

export const createAssistantReply = (questionText: string) =>
  `Saved in your browser: "${questionText}". AI backend reply will be connected later.` // temporary fake reply

export const loadStoredMessages = () => {
  try {
    const rawValue = localStorage.getItem(ASSISTANT_STORAGE_KEY)
    if (!rawValue) return [] as AssistantMessage[] // no saved history yet
    return JSON.parse(rawValue) as AssistantMessage[]
  } catch {
    return [] as AssistantMessage[] // ignore broken storage
  }
}

export const loadStoredDraft = () => {
  try {
    return localStorage.getItem(ASSISTANT_DRAFT_KEY) ?? "" // restore draft when possible
  } catch {
    return "" // ignore storage problems
  }
}
