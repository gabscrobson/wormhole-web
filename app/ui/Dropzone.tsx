'use client'

import { UploadSimple } from '@phosphor-icons/react/dist/ssr/UploadSimple'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function Dropzone() {
  const [uploadQueue, setUploadQueue] = useState<File[]>([])

  const { isDragActive, open, getInputProps, getRootProps } = useDropzone({
    onDrop: handleStartUpload,
  })

  function handleStartUpload(files: File[]) {
    setUploadQueue(files)
  }

  function handleCancelUpload() {
    setUploadQueue([])
  }

  const status =
    uploadQueue.length > 0 ? 'accept' : isDragActive ? 'active' : 'pending'

  const dropzoneCSS =
    status === 'pending'
      ? 'border-gray-400 hover:border-white'
      : status === 'active'
        ? 'border-white'
        : 'border-gray-400 disabled'

  return (
    <div className="space-y-1">
      <div
        {...getRootProps()}
        data-status={status}
        className={
          'p-2 border border-dashed rounded-md h-36 transition-all flex items-center justify-center group select-none' +
          ' ' +
          dropzoneCSS
        }
      >
        <input {...getInputProps()} />

        <div className="text-gray-400 group-hover:text-white transition-all">
          {status === 'pending' && (
            <div className="flex items-center gap-1 flex-col">
              <UploadSimple size={35} />
              <p>Choose a file or drag it here</p>
            </div>
          )}
          {status === 'active' && 'Drop your files here'}
          {status === 'accept' && (
            <div className="flex items-center gap-1 flex-col">
              <UploadSimple size={35} />
              <p>Uploading {uploadQueue.length} files</p>
              <button
                onClick={handleCancelUpload}
                className="text-red-500 hover:text-red-600 transition-all"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
