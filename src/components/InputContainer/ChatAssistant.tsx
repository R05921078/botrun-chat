import { AssistantProps } from "../../types"

export function ChatAssistant({ assistantComponent }: AssistantProps) {
  if (assistantComponent === null) return null
  return (
    <div className="br-chat-assistant">
      <div className="br-chat-assistant-item --active">{assistantComponent}</div>
    </div>
  )
}
