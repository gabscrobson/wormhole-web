import { generateDownloadPresignedUrl } from '@/app/lib/data'
import { Button } from '../Button'
import { toast } from '../Toast/use-toast'

interface DownloadButtonProps {
  fileId: string
}

export default async function DownloadButton({ fileId }: DownloadButtonProps) {
  const url = await generateDownloadPresignedUrl(fileId)

  if (!url) {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem downloading your file.',
    })
    return null
  }

  function handleDownload() {
    window.open(url)
  }

  return (
    <Button
      className="bg-purple-500 hover:bg-purple-600 w-full max-w-48"
      onClick={handleDownload}
    >
      Download
    </Button>
  )
}
