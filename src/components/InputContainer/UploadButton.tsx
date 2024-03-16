import { useRef } from "react"
import { UploadFile } from "../../types"

export function UploadButton(props: UploadFile) {
  const { handleUploadFiles } = props
  const fileInputRef = useRef<HTMLInputElement>(null)
  function handleClick() {
    fileInputRef.current?.click()
  }
  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && handleUploadFiles) {
      handleUploadFiles(e.target.files)
    }
  }
  return (
    <button className="br-btn icon-only btn-file" title="上傳檔案" onClick={handleClick}>
      <i className="icon icon-3"></i>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
    </button>
  )
}
