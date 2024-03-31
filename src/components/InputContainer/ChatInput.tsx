import React, { useState, useRef, useEffect } from "react"
import { TextAreaProps } from "../../types"
import { Recorder } from "./Recorder"
import { UploadButton } from "./UploadButton"

export default function TextArea(props: TextAreaProps) {
  const { onMessageSend, handleSpeechToText, handleUploadFiles, disabled = false } = props
  const margin = 12
  const defaultHeight = 48
  const maxHeight = defaultHeight * 4
  const [text, setText] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  function adjustHeight(e: Event) {
    if (!textareaRef.current || !wrapperRef.current) return
    const textarea = textareaRef.current
    const wrapper = wrapperRef.current
    const target = e.target as HTMLTextAreaElement
    textarea.style.height = defaultHeight + "px"
    textarea.style.height = target.scrollHeight + "px"

    if (parseInt(textarea.style.height) > defaultHeight) {
      wrapper.classList.add("--col-type")
    } else {
      wrapper.classList.remove("--col-type")
    }

    if (textarea.offsetHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`
      textarea.style.overflowY = "scroll"
    } else {
      textarea.style.overflowY = "hidden"
    }

    const newChatInputHeight = parseInt(textarea.style.height) + margin + "px"
    document.documentElement.style.setProperty("--chat-input-height", newChatInputHeight)
  }
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value)
  }
  function clearText() {
    setText("")
    if (textareaRef.current) {
      textareaRef.current.focus()
      wrapperRef.current?.classList.remove("--col-type")
      textareaRef.current.style.height = defaultHeight + "px"
      document.documentElement.style.setProperty("--chat-input-height", defaultHeight + "px")
    }
  }
  function handleSend() {
    if (disabled || text.trim() === "") return
    onMessageSend(text)
    clearText()
    textareaRef.current?.focus()
  }
  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.shiftKey && event.key === "Enter") {
    } else if (event.key === "Enter") {
      handleSend()
      event.preventDefault()
    }
  }

  useEffect(() => {
    if (!textareaRef.current || !wrapperRef.current) return
    const textarea = textareaRef.current
    textarea.focus()
    textarea.addEventListener("input", adjustHeight)
    return () => {
      textarea.removeEventListener("input", adjustHeight)
    }
  }, [textareaRef, wrapperRef])

  return (
    <div ref={wrapperRef} className={`br-chat-input ${isRecording ? "--voice-type" : ""}`}>
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
        style={{ height: `${defaultHeight}px` }}
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
