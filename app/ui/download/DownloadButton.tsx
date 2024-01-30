'use client'

import { generateDownloadPresignedUrl } from '@/app/lib/data'
import { Button } from '../Button'
import { useEffect, useState } from 'react'
import { CircleNotch } from '@phosphor-icons/react'
import axios from 'axios'
import fileDownload from 'js-file-download'

interface DownloadButtonProps {
  fileId: string
  fileName: string
}

export default function DownloadButton({
  fileId,
  fileName,
}: DownloadButtonProps) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    generateDownloadPresignedUrl(fileId).then((url) => setUrl(url))
  })

  async function handleDownload() {
    if (!url) return
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, fileName)
      })
  }

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
      onClick={handleDownload}
    >
      Download
    </Button>
  )
}
