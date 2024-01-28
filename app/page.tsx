'use client'

import { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FilePlus } from '@phosphor-icons/react/dist/ssr/FilePlus'
import axios, { Canceler } from 'axios'
import { generateUploadPresignedUrl } from './lib/data'
import { Button } from './ui/Button'
import Dropzone from './ui/Dropzone'
import { Files } from '@phosphor-icons/react'
import { useToast } from './ui/Toast/use-toast'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fileId, setFileId] = useState<string | null>(null)

  const cancelFileUpload = useRef<Canceler | null>(null)

  const { toast } = useToast()

  const { isDragActive, open, getInputProps, getRootProps } = useDropzone({
    onDrop: handleStartUpload,
    noClick: isUploading,
  })

  async function handleStartUpload(files: File[]) {
    setFile(files[0])
    setIsUploading(true)

    const data = await generateUploadPresignedUrl(
      files[0].name,
      files[0].type,
      files[0].size,
    )

    if (!data) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem uploading your file.',
      })
      return
    }

    await axios.put(data.signedUrl, files[0], {
      headers: {
        'Content-Type': files[0].type,
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total = 1 } = progressEvent

        const progress = Math.round((loaded * 100) / total)

        if (progress <= 100) {
          setProgress(progress)
        }
      },
      cancelToken: new axios.CancelToken((cancel) => {
        cancelFileUpload.current = cancel
      }),
    })
  }

  function handleCancelUpload() {
    if (cancelFileUpload.current) {
      cancelFileUpload.current()
    }
    setFile(null)
    setIsUploading(false)
    setProgress(0)
    setFileId(null)
  }

  async function handlePasteFromClipboard() {
    try {
      const clipboardItems = await navigator.clipboard.read()
      const blobOutput = await clipboardItems[0].getType('image/png')
      const data = URL.createObjectURL(blobOutput)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <Dropzone
        file={file}
        isDragActive={isDragActive}
        open={open}
        getInputProps={getInputProps}
        getRootProps={getRootProps}
        handleCancelUpload={handleCancelUpload}
        progress={progress}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          onClick={open}
          disabled={file != null}
          className="bg-transparent border border-gray-400 text-gray-400 
          hover:bg-transparent hover:text-white hover:border-white"
        >
          <FilePlus size={20} />
          Select File
        </Button>
        <Button
          onClick={handlePasteFromClipboard}
          disabled={file != null}
          className="bg-transparent border border-gray-400 text-gray-400 
          hover:bg-transparent hover:text-white hover:border-white"
        >
          <Files size={20} />
          Paste from Clipboard
        </Button>
      </div>
    </div>
  )
}
