'use client'

import { generateDownloadPresignedUrl } from '@/app/lib/data'
import { Button } from '../Button'
import { useEffect, useState } from 'react'
import { CircleNotch } from '@phosphor-icons/react'

interface DownloadButtonProps {
  fileId: string
}

export default function DownloadButton({ fileId }: DownloadButtonProps) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    generateDownloadPresignedUrl(fileId).then((url) => setUrl(url))
  })

  if (!url) {
    return (
      <Button className="bg-purple-500 hover:bg-purple-600 w-full max-w-48">
        <CircleNotch className="animate-spin" size={24} />
      </Button>
    )
  }

  return (
    <Button
      className="bg-purple-500 hover:bg-purple-600 w-full max-w-48"
      asChild
    >
      <a href={url} download>
        Download
      </a>
    </Button>
  )
}
