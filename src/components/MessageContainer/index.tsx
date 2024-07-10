import { useEffect, useRef } from "react"
import { MessageContainerProps } from "../../types"
import { MessageEntry } from "./MessageEntry"

export default function MessageContainer(props: MessageContainerProps) {
  const { messages, remarkPlugins, theme } = props
  const endOfMessagesRef = useRef<null | HTMLDivElement>(null)
  const messageContainerRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const isScrolledToBottom = () => {
    if (!messageContainerRef.current) return true
    const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current
    return scrollHeight - scrollTop - clientHeight < 100
  }

  useEffect(() => {
    if (isScrolledToBottom()) {
      scrollToBottom()
    }
  }, [messages])

  return (
    <div className="br-chat-display-container --has-avatar" ref={messageContainerRef}>
      <div className="br-chat-display">
        {messages.map((m, index) => (
          <MessageEntry
            key={`br-chat-display-${index}`}
            {...m}
            remarkPlugins={remarkPlugins}
            theme={theme}
          />
        ))}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  )
}
