import "../css/botrun-chat-dark.css"
import "../css/botrun-chat-style.css"
import InputContainer from "../components/InputContainer"
import MessageContainer from "../components/MessageContainer"
import { BotrunChatProps } from "../types"

const BotrunChat = (props: BotrunChatProps) => {
  return (
    <div className="br-chat-component">
      <MessageContainer {...props} />
      <InputContainer {...props} />
    </div>
  )
}

export default BotrunChat
