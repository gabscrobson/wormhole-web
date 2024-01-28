import { unstable_noStore as noStore } from 'next/cache'
import { FileInfo, GenerateUploadPresignedUrlResponse } from './definitions'
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

export async function generateUploadPresignedUrl(
  fileName: string,
  contentType: string,
  size: number,
): Promise<GenerateUploadPresignedUrlResponse | null> {
  noStore()

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads`,
      {
        name: fileName,
        contentType,
        size,
      },
    )

    const data: GenerateUploadPresignedUrlResponse = res.data

    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function generateDownloadPresignedUrl(
  fileId: string,
): Promise<string | null> {
  noStore()

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${fileId}`,
    )

    const data: string = res.data

    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
