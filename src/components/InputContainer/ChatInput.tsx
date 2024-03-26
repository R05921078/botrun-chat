import React, { useState, useRef, useEffect } from "react"
import { TextAreaProps } from "../../types"
import { Recorder } from "./Recorder"
import { UploadButton } from "./UploadButton"

export default function TextArea(props: TextAreaProps) {
  const { onMessageSend, handleSpeechToText, handleUploadFiles, disabled = false } = props
  const defaultHeight = 48
  const [text, setText] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [textareaHeight, setTextareaHeight] = useState(defaultHeight)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function adjustHeight() {
    if (!textareaRef.current) return
    const lines = (textareaHeight - defaultHeight) / 22

    if (lines < 1) {
      if (text.length * 8 + 130 >= textareaRef.current?.offsetWidth)
        setTextareaHeight(prevHeight => {
          const newHeight = prevHeight + 22
          return newHeight
        })
    } else {
      if (text.length * 8 >= (textareaRef.current?.offsetWidth + 130) * lines) {
        setTextareaHeight(prevHeight => {
          const newHeight = prevHeight + 22
          return newHeight
        })
      }
    }

    // if (textareaRef.current && text.length * 8 + 130 >= textareaRef.current?.offsetWidth)
    //   setTextareaHeight(prevHeight => {
    //     const newHeight = prevHeight + 22
    //     return newHeight
    //   })
    // else
    //   setTextareaHeight(prevHeight => {
    //     const newHeight = prevHeight - 22
    //     return newHeight < defaultHeight ? defaultHeight : newHeight
    //   })
  }
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value)
    adjustHeight()
  }
  function clearText() {
    setText("")
    textareaRef.current?.focus()
  }
  function handleSend() {
    if (disabled || text.trim() === "") return
    onMessageSend(text)
    setTextareaHeight(defaultHeight)
    clearText()
    textareaRef.current?.focus()
  }
  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.shiftKey && event.key === "Enter") {
      setTextareaHeight(prevHeight => {
        const newHeight = prevHeight + 22
        return newHeight
      })
    } else if (event.key === "Enter") {
      handleSend()
      event.preventDefault()
    } else if (event.key === "Backspace") {
      const cursorPosition = textareaRef.current?.selectionStart
      const isAtStartOfLine = cursorPosition === 0 || text[cursorPosition! - 1] === "\n"

      if (isAtStartOfLine) {
        setTextareaHeight(prevHeight => {
          const newHeight = prevHeight - 22
          return newHeight < defaultHeight ? defaultHeight : newHeight
        })
      }
    }
  }

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  return (
    <div
      className={`br-chat-input ${isRecording ? "--voice-type" : ""} ${
        textareaHeight > 48 ? "--col-type" : ""
      }`}
    >
      <textarea
        ref={textareaRef}
        name=""
        id=""
        cols={30}
        rows={10}
        placeholder="請輸入文字"
        value={text}
        className={`${text !== "" ? "--has-value" : ""}`}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        style={{ height: `${textareaHeight}px` }}
      ></textarea>

      <div className="fn">
        <UploadButton handleUploadFiles={handleUploadFiles} disabled={disabled} />
        <Recorder
          setIsRecording={setIsRecording}
          setText={setText}
          handleSpeechToText={handleSpeechToText}
        />
        <button className="br-btn icon-only btn-remove" title="清除輸入文字" onClick={clearText}>
          <i className="icon icon-5"></i>
        </button>
        <button
          className={`br-btn icon-only btn-submit ${disabled ? "--disabled" : ""}`}
          title="送出"
          disabled={disabled}
          onClick={handleSend}
        >
          <i className="icon icon-4"></i>
        </button>
      </div>
    </div>
  )
}
