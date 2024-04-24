import SyntaxHighlighter from "react-syntax-highlighter"
import { darcula, docco } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { CodeBlockProps } from "../../types"
import { useState } from "react"

export function CodeBlock({ match, children, handleCopy, theme }: CodeBlockProps) {
  const language = match ? match[1] : "unkown"
  const content = String(children).replace(/\n$/, "")
  const [isCollapse, setIsCollapse] = useState(false)
  return (
    <div className={`code-style-container ${isCollapse ? "--collapse" : ""}`}>
      <div className="code-style-top">
        <strong>{language}</strong>
        <div className="fn">
          <button
            className="br-btn icon-only square no-border"
            data-codecollapse=""
            onClick={() => setIsCollapse(prev => !prev)}
          >
            <i className="icon icon-32"></i>
          </button>
          <button className="br-btn icon-only square no-border" onClick={() => handleCopy(content)}>
            <i className="icon icon-26"></i>
          </button>
        </div>
      </div>
      <div className={`code-style-body`}>
        <SyntaxHighlighter language={language} style={theme === "dark" ? darcula : docco}>
          {content}
        </SyntaxHighlighter>
      </div>
      <div className={`code-style-bottom`}>Boosted by Botrun.ai</div>
    </div>
  )
}
