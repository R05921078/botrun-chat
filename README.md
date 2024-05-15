# BotrunChat Component

## Introduction

The `BotrunChat` component is a comprehensive chat UI for React applications, featuring message display with various sender types, suggestion actions, custom code blocks, speech-to-text input, file uploads, and extensibility via remark plugins. It supports theming options for personalization.

## Installation

```bash
npm install @botrun/chat
# or
yarn add @botrun/chat
```

To incorporate the correct import statement into the `README.md`'s **Usage** section for the `BotrunChat` component, considering the adjustments made to your `index.ts`, you can update the documentation as follows:

## Usage

To use the `BotrunChat` component in your project, first ensure that you import the component and any other necessary props or types that you plan to use. Below is an example showcasing how to set up the `BotrunChat` component within a React application:

```jsx
import React, { useState } from 'react';
import BotrunChat, { MessageProps } from '@botrun/chat';

function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [messages, setMessages] = useState<MessageProps[]>([]);
  // Additional state and function definitions for handling messages, file uploads, etc.
  // Function implementations for onMessageSend, handleSpeechToText, handleUploadFiles, etc.

  return (
    <BotrunChat
      theme={theme}
      onMessageSend={onMessageSend}
      messages={messages}
      // Include additional props as needed
    />
  );
}

export default App;
```

## Props

This section outlines the props accepted by the `BotrunChat` component, including their data types, whether they are optional, and a brief description of each.

### `disabled` (`boolean`, optional)

When `true`, it disables user interactions such as sending messages and uploading files. The default value is `false`.

### `messages` (`MessageProps[]`, required)

An array of message objects that the chat will display. Each `MessageProps` object contains details about the sender, content, and optional suggestions for the message.

### `onMessageSend` (`(message: string) => void`, required)

A callback function that is called when a new message is sent. It receives the message content as a parameter.

### `handleSpeechToText` (`(file: File) => Promise<string>`, optional)

A function for converting speech to text. It takes a `File` representing the audio file as input and returns a `Promise` that resolves to a string of the converted text. If the string is not empty, it will automatically be set in the input area.

### `handleUploadFiles` (`(files: FileList) => void`, optional)

A function for handling file uploads. It receives a `FileList` of selected files as input.

### `assistantComponent` (`React.ReactElement | null`, optional)

An optional React element to be used as an assistant component in the chat UI. This can be used to display custom messages or actions based on the chat's state (e.g., typing indicators, upload progress).

### `remarkPlugins` (`PluggableList | null | undefined`, optional)

An optional list of remark plugins to extend the markdown rendering capabilities of the chat. This prop allows for customization of the text processing and rendering within the chat interface.

Each prop plays a crucial role in customizing and controlling the behavior of the `BotrunChat` component. By providing detailed information on each prop, developers can more easily understand how to effectively use the component in their projects.

### `layout` (`"default" | "chat"`, optional)

The `layout` prop determines the alignment of messages within the chat interface. If set to `"default"`, all messages are aligned to the left. When set to `"chat"`, messages from the user (`self`) are aligned to the right, while messages from others are aligned to the left. The default value for this prop is `"default"`.

### `speedySpeech` (`boolean`, optional)

The `speedySpeech` prop allows you to enhance the visual feedback of the speech-to-text functionality. When set to `true`, it changes the microphone icon to include a lightning symbol, indicating a "speedy" mode. The default value of this prop is `false`.

## License

This project is licensed under the MIT License.
