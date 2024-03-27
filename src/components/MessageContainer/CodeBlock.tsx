import SyntaxHighlighter from "react-syntax-highlighter"
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { CodeBlockProps } from "../../types"

export function CodeBlock({ match, children, handleCopy }: CodeBlockProps) {
  const language = match ? match[1] : "unkown"
  const content = String(children).replace(/\n$/, "")
  return (
    <div className={`code-style-container`}>
      <div className="code-style-top">
        <strong>{language}</strong>
        <div className="fn">
          <button className="br-btn icon-only square no-border" onClick={() => handleCopy(content)}>
            <i className="icon icon-26"></i>
          </button>
        </div>
      </div>
      <div className={`code-style-body`}>
        <SyntaxHighlighter language={language} style={darcula}>
          {content}
        </SyntaxHighlighter>
      </div>
      <div className={`code-style-bottom`}>Boosted by Botrun.ai</div>
    </div>
  )
}
