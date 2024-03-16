import { memo } from "react"
import Markdown from "react-markdown"
import { MessageProps } from "../../types"
import { SuggestionEntry } from "./SuggestionEntry"
import { CodeBlock } from "./CodeBlock"

function arePropsEqual(oldProps: MessageProps, newProps: MessageProps) {
  return JSON.stringify(oldProps) === JSON.stringify(newProps)
}

export const MessageEntry = memo((props: MessageProps) => {
  const { sender, avatar, name, content, suggestions, remarkPlugins } = props
  return (
    <div className={`br-chat-item ${sender}`}>
      <div className="avatar-block">
        <div
          className="avatar"
          style={{
            backgroundImage: `url(${avatar})`,
          }}
        ></div>
        <div className="name">{name}</div>
      </div>
      <div className="br-chat-block">
        <Markdown
          className="markdown-wrapper"
          remarkPlugins={remarkPlugins}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props
              const match = /language-(\w+)/.exec(className || "")
              return match ? (
                <CodeBlock match={match}>{children}</CodeBlock>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              )
            },
          }}
        >
          {content}
        </Markdown>
      </div>
      {suggestions ? (
        <div className="suggestion-block">
          <h3>可以進行的動作</h3>
          <div className="br-btn-group">
            {suggestions.map(s => (
              <SuggestionEntry {...s} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}, arePropsEqual)
