import "../css/botrun-chat-dark.css"
import "../css/botrun-chat-style.css"
import InputContainer from "../components/InputContainer"
import MessageContainer from "../components/MessageContainer"
import { BotrunChatProps } from "../types"

const BotrunChat = (props: BotrunChatProps) => {
  const { layout = "default" } = props
  return (
    <div className={`br-chat-component ${layout === "chat" ? "--layout-chatmode" : ""}`}>
      <MessageContainer {...props} />
      <InputContainer {...props} />
    </div>
  )
}

export default BotrunChat
