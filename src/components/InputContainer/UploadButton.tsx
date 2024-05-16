import { useRef } from "react"
import { UploadFile } from "../../types"

export function UploadButton(props: UploadFile) {
  const { handleUploadFiles, disabled = false } = props
  const fileInputRef = useRef<HTMLInputElement>(null)
  function handleClick() {
    fileInputRef.current?.click()
  }
  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && handleUploadFiles) {
      handleUploadFiles(e.target.files)
      e.target.value = ""
    }
  }
  return (
    <button
      className={`br-btn icon-only btn-file ${disabled ? "--disabled" : ""}`}
      title="上傳檔案"
      disabled={disabled}
      onClick={handleClick}
    >
      <i className="icon icon-3"></i>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        disabled={disabled}
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
    </button>
  )
}
