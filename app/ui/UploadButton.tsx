import { FileArrowUp } from '@phosphor-icons/react/dist/ssr/FileArrowUp'
import Button from './Button'

interface UploadButtonProps {
  file: File | null
}

export default function UploadButton({ file }: UploadButtonProps) {
  return (
    <Button
      disabled={!file}
      className="hover:text-purple-500 hover:border-purple-500 
      hover:bg-transparent bg-purple-500 text-white border-transparent 
      disabled:bg-transparent disabled:border-purple-500 disabled:text-purple-500"
    >
      <FileArrowUp size={20} />
      Upload
    </Button>
  )
}
