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
  const handleCopy = (text: string) => {
    if (sender !== "self") text = text + "\n[Boosted by Botrun.ai]"
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // console.log("[FileCopyButton] Code copied to clipboard!");
      })
      .catch(err => {
        console.error("[FileCopyButton] Failed to copy: ", err)
      })
  }
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
              return (
                <CodeBlock match={match} handleCopy={handleCopy}>
                  {children}
                </CodeBlock>
              )
            },
            a: ({ node, href, children, ...props }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
              </a>
            ),
          }}
        >
          {content}
        </Markdown>
      </div>
      {sender !== "system" ? (
        <div className="br-chatfn-block">
          <button className="br-btn icon-only square no-border" onClick={() => handleCopy(content)}>
            <i className="icon icon-26"></i>
          </button>
          {/* <button className="br-btn icon-only square no-border">
          <i className="icon icon-24"></i>
        </button> */}
        </div>
      ) : null}
      {suggestions ? (
        <div className="suggestion-block">
          <h3>可以進行的動作</h3>
          <div className="br-btn-group">
            {suggestions.map((s, index) => (
              <SuggestionEntry key={`br-chat-suggestion-${index}`} {...s} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}, arePropsEqual)
