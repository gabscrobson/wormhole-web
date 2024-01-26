'use client'

import { UploadSimple } from '@phosphor-icons/react/dist/ssr/UploadSimple'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import UploadButton from './UploadButton'
import { FilePlus } from '@phosphor-icons/react/dist/ssr/FilePlus'
import { Button } from './Button'
import axios from 'axios'
import { set } from 'zod'

interface UploadResponse {
  signedUrl: string
  fileId: string
}

export default function Dropzone() {
  const BACKEND_URL = 'http://localhost:3333'
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fileId, setFileId] = useState<string | null>(null)

  const { isDragActive, open, getInputProps, getRootProps } = useDropzone({
    onDrop: handleStartUpload,
    noClick: isUploading,
  })

  async function handleStartUpload(files: File[]) {
    setFile(files[0])
    setIsUploading(true)

    const res = await axios.post(`${BACKEND_URL}/uploads`, {
      name: files[0].name,
      contentType: files[0].type,
    })

    const data: UploadResponse = res.data

    setFileId(data.fileId)

    await axios.put(data.signedUrl, files[0], {
      headers: {
        'Content-Type': files[0].type,
      },
      onUploadProgress: (progressEvent) => {
        const progress =
          (progressEvent.loaded / (progressEvent?.total ?? 1)) * 100
        setProgress(progress)
      },
    })
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
                <p>{progress}</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UploadButton file={file} />
        <Button
          onClick={open}
          disabled={file != null}
          className="bg-transparent border border-gray-400 text-gray-400 
          hover:bg-transparent hover:text-white hover:border-white"
        >
          <FilePlus size={20} />
          Select File
        </Button>
      </div>
    </div>
  )
}
