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
    noDrag: isUploading,
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
      handleCancelUpload()
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

    setFileId(data.fileId)
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
    if (!navigator.clipboard) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Clipboard API not available.',
      })
      return
    }

    try {
      const items = await navigator.clipboard.read()
      if (items.length === 0) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'No items on clipboard.',
        })
        return
      }

      // Get the first item from the clipboard
      const clipboardItem = items[0]

      // Get all the types for this clipboard item
      const types = clipboardItem.types

      if (types.length === 0) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'No valid types found for clipboard item.',
        })
        return
      }

      // Get the blob for the first type
      const blob = await clipboardItem.getType(types[0])

      // Convert the blob to a file
      const file = new File([blob], 'ClipboardFile', { type: types[0] })

      // Start the upload
      handleStartUpload([file])
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: "Couldn't read from clipboard.",
      })
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
        fileId={fileId}
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
