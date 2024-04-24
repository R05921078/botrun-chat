import React from "react"
import { PluggableList } from "react-markdown/lib"

export type MessageProps = {
  sender: "others" | "system" | "self"
  avatar: string
  name: string
  content: string
  suggestions?: SuggestionProps[]
} & RemarkPlugins &
  ThemeProps

export type SuggestionProps = {
  onClick: Function
  text: string
}

export type CodeBlockProps = {
  match: RegExpExecArray | null
  children: React.ReactNode
  handleCopy: (text: string) => void
} & ThemeProps

export type AssistantProps = { assistantComponent?: React.ReactElement | null }

export type MessageContainerProps = {
  messages: MessageProps[]
} & RemarkPlugins &
  ThemeProps

export type SpeechToText = {
  handleSpeechToText?: (file: File) => Promise<string>
}

export type UploadFile = {
  handleUploadFiles?: (files: FileList) => void
  disabled?: boolean
}

export type RemarkPlugins = {
  remarkPlugins?: PluggableList | null | undefined
}

export type RecorderProps = {
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>
  setText: React.Dispatch<React.SetStateAction<string>>
} & SpeechToText

export type TextAreaProps = {
  onMessageSend: (message: string) => void
  disabled?: boolean
} & SpeechToText &
  UploadFile

export type InputContainerProps = TextAreaProps & SpeechToText & UploadFile & AssistantProps

export type BotrunChatProps = MessageContainerProps &
  TextAreaProps &
  SpeechToText &
  RemarkPlugins &
  UploadFile &
  AssistantProps &
  ThemeProps & { layout?: "chat" | "default" }

export type ThemeProps = {
  theme?: "dark" | "light"
}
