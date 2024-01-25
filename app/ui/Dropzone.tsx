'use client'

import { UploadSimple } from '@phosphor-icons/react/dist/ssr/UploadSimple'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import UploadButton from './UploadButton'
import { FilePlus } from '@phosphor-icons/react/dist/ssr/FilePlus'
import Button from './Button'

export default function Dropzone() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const { isDragActive, open, getInputProps, getRootProps } = useDropzone({
    onDrop: handleStartUpload,
    noClick: isUploading,
  })

  function handleStartUpload(files: File[]) {
    setFile(files[0])
    setIsUploading(true)
  }

  function handleCancelUpload() {
    setFile(null)
    setIsUploading(false)
  }

  const status = file ? 'accept' : isDragActive ? 'active' : 'pending'

  const dropzoneCSS =
    status === 'pending'
      ? 'border-gray-400 hover:border-white cursor-pointer'
      : 'border-white'
  const dropzoneTextCSS =
    status === 'pending' ? 'text-gray-400 group-hover:text-white' : 'text-white'

  return (
    <div className="flex flex-col gap-5">
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
                <Button
                  onClick={handleCancelUpload}
                  className="hover:bg-red-500 hover:border-transparent 
                  border-red-500 text-red-500 py-1"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UploadButton file={file} />
        <Button onClick={open} disabled={file != null}>
          <FilePlus size={20} />
          Select File
        </Button>
      </div>
    </div>
  )
}
