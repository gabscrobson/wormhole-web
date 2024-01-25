import { unstable_noStore as noStore } from 'next/cache'
import { env } from './env'
import { FileInfo } from './definitions'

export async function fetchFile(fileId: string): Promise<FileInfo | null> {
  noStore()

  try {
    const res = await fetch(`${env.BACKEND_URL}/files/${fileId}`)

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.log('error')
    return null
  }
}
