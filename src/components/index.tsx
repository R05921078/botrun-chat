import "../css/botrun-chat-dark.css"
import "../css/botrun-chat-style.css"
import InputContainer from "../components/InputContainer"
import MessageContainer from "../components/MessageContainer"
import { BotrunChatProps } from "../types"

const BotrunChat = (props: BotrunChatProps) => {
  const { layout = "default", messagesOnly = false } = props
  return (
    <div className={`br-chat-component ${layout === "chat" ? "--layout-chatmode" : ""}`}>
      <MessageContainer {...props} />
      {!messagesOnly ? <InputContainer {...props} /> : null}
    </div>
  )
}

export default BotrunChat
