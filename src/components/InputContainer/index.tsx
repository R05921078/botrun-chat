import ChatInput from "./ChatInput"
import { InputContainerProps } from "../../types"
import { ChatAssistant } from "./ChatAssistant"

export default function InputContainer(props: InputContainerProps) {
  return (
    <div className="br-chat-input-container" data-dynamic-input="">
      <ChatAssistant assistantComponent={props.assistantComponent} />
      <ChatInput {...props} />
    </div>
  )
}
