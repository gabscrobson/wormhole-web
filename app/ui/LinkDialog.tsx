import { Clipboard } from '@phosphor-icons/react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './AlertDialog'
import { useToast } from './Toast/use-toast'

interface LinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  url: string
  onContinue: () => void
}

export default function LinkDialog({
  open,
  onOpenChange,
  url,
  onContinue,
}: LinkDialogProps) {
  const { toast } = useToast()

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(url)
    toast({
      title: 'Link copied to clipboard',
      description: 'You can now paste the link wherever you want.',
      className: 'bg-green-500 text-white border-none',
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-black border-gray-900">
        <AlertDialogHeader>
          <AlertDialogTitle>File download link</AlertDialogTitle>
          <div
            className="bg-gray-900 p-2 rounded-md flex 
            items-center justify-between"
          >
            <p
              className="overflow-hidden text-ellipsis 
              max-w-80 text-gray-200"
            >
              {url}
            </p>
            <Clipboard
              className="cursor-pointer hover:text-gray-200"
              onClick={handleCopyToClipboard}
              size={24}
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onContinue}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
