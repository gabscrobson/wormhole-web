'use client'

import { ArchiveBox, UploadSimple } from '@phosphor-icons/react'
import { Button } from './Button'
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone'
import ProgressBar from './ProgressBar'
import { useEffect, useState } from 'react'
import CopyLink from './CopyLink'

interface DropzoneProps {
  file: File | null
  isDragActive: boolean
  open: () => void
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T
  handleCancelUpload: () => void
  progress: number
  fileId: string | null
}

type Status = 'pending' | 'ready' | 'uploading' | 'dragging'

export default function Dropzone({
  file,
  isDragActive,
  getInputProps,
  getRootProps,
  handleCancelUpload,
  progress,
  fileId,
}: DropzoneProps) {
  const [url, setUrl] = useState<string>('')

  // Set the URL of the current page on mount
  useEffect(() => {
    setUrl(window.location.origin)
  }, [])

  // Set the status of the dropzone and its CSS
  let status: Status = 'pending'

  if (fileId) status = 'ready'
  else if (file) status = 'uploading'
  else if (isDragActive) status = 'dragging'

  const dropzoneCSS =
    status === 'pending'
      ? 'border-gray-400 hover:border-white cursor-pointer'
      : 'border-white'
  const dropzoneTextCSS =
    status === 'pending' ? 'text-gray-400 group-hover:text-white' : 'text-white'

  return (
    <div className="space-y-1">
      <div
        {...getRootProps()}
        data-status={status}
        className={
          'p-2 border border-dashed rounded-md h-36 transition-all group select-none' +
          ' ' +
          dropzoneCSS
        }
      >
        <input {...getInputProps()} />

        <div
          className={
            'transition-all text-center h-full' + ' ' + dropzoneTextCSS
          }
        >
          {status === 'pending' && (
            <div className="flex items-center justify-center gap-1 flex-col h-full">
              <UploadSimple size={35} />
              <p>Choose a file or drag it here</p>
            </div>
          )}

          {status === 'ready' && (
            <div className="flex items-center justify-center gap-3 flex-col h-full">
              <CopyLink link={`${url}/download/${fileId}`} />
              <Button onClick={handleCancelUpload}>Continue</Button>
            </div>
          )}

          {status === 'uploading' && (
            <div className="flex items-center justify-center gap-2 flex-col h-full w-8/12 m-auto">
              <p>
                Uploading <strong>{file?.name}</strong>
              </p>
              <ProgressBar progress={progress} />
              <Button
                onClick={handleCancelUpload}
                className="hover:bg-red-500 hover:text-white
                  text-red-500"
              >
                Cancel
              </Button>
            </div>
          )}

          {status === 'dragging' && (
            <div className="flex items-center justify-center gap-1 flex-col h-full">
              <ArchiveBox size={35} />
              <p>Drop your files here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
