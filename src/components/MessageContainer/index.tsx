import { useEffect, useRef } from "react"
import { MessageContainerProps } from "../../types"
import { MessageEntry } from "./MessageEntry"

export default function MessageContainer(props: MessageContainerProps) {
  const { messages, remarkPlugins } = props
  const endOfMessagesRef = useRef<null | HTMLDivElement>(null)
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  return (
    <div className="br-chat-display-container --has-avatar">
      <div className="br-chat-display">
        {messages.map((m, index) => (
          <MessageEntry key={`br-chat-display-${index}`} {...m} remarkPlugins={remarkPlugins} />
        ))}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  )
}
