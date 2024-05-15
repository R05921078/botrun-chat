import { useEffect } from "react"
import { RecorderProps } from "../../types"
import { useAudioRecorder } from "react-audio-voice-recorder"
import moment from "moment"

export function Recorder(props: RecorderProps) {
  const { setIsRecording, setText, handleSpeechToText } = props
  const { startRecording, stopRecording, recordingBlob, isRecording, recordingTime } =
    useAudioRecorder()
  const duration = moment.duration(recordingTime, "seconds")

  function handleRecording() {
    if (isRecording) stopRecording()
    else startRecording()
  }

  useEffect(() => {
    setIsRecording(isRecording)
  }, [isRecording])

  useEffect(() => {
    const convertSpeechToText = async () => {
      if (recordingBlob !== undefined) {
        const now = moment().format("YYYY-MM-DD_HH-mm-ss")
        const fileName = `record_${now}.webm`
        const file = new File([recordingBlob], fileName, { type: "audio/webm" })

        if (handleSpeechToText !== undefined) {
          const text = await handleSpeechToText(file)
          if (text !== "") setText(text)
        }
      }
    }

    convertSpeechToText()
  }, [recordingBlob])

  return (
    <button
      className={`br-btn icon-only btn-voice ${isRecording ? "--active" : ""}`}
      title="聲音輸入"
      onClick={handleRecording}
    >
      <i className="icon icon-2"></i>
      <div className="time-count">{moment.utc(duration.asMilliseconds()).format("HH:mm:ss")}</div>
    </button>
  )
}
