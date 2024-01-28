'use client'

import { UploadSimple } from '@phosphor-icons/react'
import { Button } from './Button'
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone'
import ProgressBar from './ProgressBar'

interface DropzoneProps {
  file: File | null
  isDragActive: boolean
  open: () => void
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T
  handleCancelUpload: () => void
  progress: number
}

export default function Dropzone({
  file,
  isDragActive,
  getInputProps,
  getRootProps,
  handleCancelUpload,
  progress,
}: DropzoneProps) {
  const status = file ? 'accept' : isDragActive ? 'active' : 'pending'

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
          'p-2 border border-dashed rounded-md h-36 transition-all flex items-center justify-center group select-none' +
          ' ' +
          dropzoneCSS
        }
      >
        <input {...getInputProps()} />

        <div className={'transition-all text-center' + ' ' + dropzoneTextCSS}>
          {status === 'pending' && (
            <div className="flex items-center gap-1 flex-col">
              <UploadSimple size={35} />
              <p>Choose a file or drag it here</p>
            </div>
          )}
          {status === 'active' && 'Drop your files here'}
          {status === 'accept' && (
            <div className="flex items-center gap-2 flex-col">
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
        </div>
      </div>
    </div>
  )
}
