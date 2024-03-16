import { SuggestionProps } from "../../types"

export function SuggestionEntry(props: SuggestionProps) {
  const { onClick, text } = props
  return (
    <div className="br-btn rd" onClick={() => onClick()}>
      {text}
    </div>
  )
}
