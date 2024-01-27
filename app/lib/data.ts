import { unstable_noStore as noStore } from 'next/cache'
import { FileInfo, GeneratePresignedUrlResponse } from './definitions'
import axios from 'axios'

export async function fetchFile(fileId: string): Promise<FileInfo | null> {
  noStore()

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${fileId}`,
    )

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function generatePresignedUrl(
  fileName: string,
  contentType: string,
): Promise<GeneratePresignedUrlResponse | null> {
  noStore()

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads`,
      {
        name: fileName,
        contentType,
      },
    )

    const data: GeneratePresignedUrlResponse = res.data

    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
