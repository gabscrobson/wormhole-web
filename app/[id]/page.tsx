import { X } from '@phosphor-icons/react/dist/ssr/X'
import { fetchFile } from '../lib/data'
import { formatBytes } from '../lib/utils'
import Countdown from '../ui/[id]/Countdown'
import DownloadButton from '../ui/[id]/DownloadButton'
import { Suspense } from 'react'

interface Params {
  params: {
    id: string
  }
}

export default async function Page({ params }: Params) {
  const file = await fetchFile(params.id)

  if (!file) {
    return (
      <div className="flex items-center justify-center h-32 font-bold gap-3 rounded-md">
        <h1>File not found or expired</h1>
        <X size={32} />
      </div>
    )
  }

  return (
    <div className="bg-gray-900 p-5 rounded-md grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <h1>
          Name: <strong>{file.name}</strong>
        </h1>
        <p>
          Type: <strong>{file.contentType}</strong>
        </p>
        <p>
          Size: <strong>{formatBytes(file.size)}</strong>
        </p>
      </div>
      <div className="flex items-center justify-center flex-col gap-1">
        <Suspense fallback={<div>Loading...</div>}>
          <DownloadButton fileId={file.id} />
        </Suspense>
        <Countdown createdAt={file.createdAt} />
      </div>
    </div>
  )
}
