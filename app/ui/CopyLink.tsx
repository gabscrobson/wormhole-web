import { useToast } from './Toast/use-toast'
import { Clipboard } from '@phosphor-icons/react'

interface CopyLinkProps {
  link: string
}

export default function CopyLink({ link }: CopyLinkProps) {
  const { toast } = useToast()

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(link)
    toast({
      title: 'Link copied to clipboard',
      description: 'You can now paste the link wherever you want.',
      className: 'bg-gray-900 text-white border-none',
    })
  }

  return (
    <div
      className="bg-gray-900 hover:bg-gray-950 text-gray-200 hover:text-gray-400 p-2 rounded-md flex 
      items-center justify-between gap-1 cursor-pointer select-none transition-all w-10/12"
      onClick={handleCopyToClipboard}
    >
      <p className="overflow-hidden text-ellipsis">{link}</p>
      <Clipboard className="cursor-pointer flex-shrink-0" size={24} />
    </div>
  )
}
