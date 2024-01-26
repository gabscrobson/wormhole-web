import { FileArrowUp } from '@phosphor-icons/react/dist/ssr/FileArrowUp'
import axios from 'axios'
import { Button } from './Button'

interface UploadButtonProps {
  file: File | null
}

export default function UploadButton({ file }: UploadButtonProps) {
  function handleUpload() {
    axios.put(
      'https://wormhole-dev.1a3043860468468a343d89bcde0f69c3.r2.cloudflarestorage.com/4195a37b-40c6-4c8c-98d9-ab708e0b957c-profile.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=d2edf299be01f9cc459833605c9bf02c%2F20240125%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20240125T143126Z&X-Amz-Expires=600&X-Amz-Signature=244290f593df0f5901b015d801da9f28a08119074d81705d5cb8a4b612732bfd&X-Amz-SignedHeaders=host&x-id=PutObject',
      file,
      {
        headers: {
          'Content-Type': file?.type,
        },
      },
    )
  }

  return (
    <Button
      disabled={!file}
      className="bg-purple-500 text-white hover:bg-purple-600"
      // onClick={handleUpload}
    >
      <FileArrowUp size={20} />
      Upload
    </Button>
  )
}
