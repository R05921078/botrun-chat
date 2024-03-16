import SyntaxHighlighter from "react-syntax-highlighter"
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { CodeBlockProps } from "../../types"
import "../../css/botrun-code.css"

export function CodeBlock({ match, children }: CodeBlockProps) {
  const language = match ? match[1] : "unkown"
  return (
    <>
      <div className={`code-style-top`}>{language}</div>
      <div className={`code-style-body`}>
        <SyntaxHighlighter language={language} style={darcula}>
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
      <div className={`code-style-bottom`}>Boosted by Botrun.ai</div>
    </>
  )
}
