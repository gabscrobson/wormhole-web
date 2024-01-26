import { X } from '@phosphor-icons/react/dist/ssr/X'
import { fetchFile } from '../lib/data'

interface Params {
  params: {
    id: string
  }
}

export default async function Page({ params }: Params) {
  const file = await fetchFile(params.id)
  console.log(file)

  if (!file) {
    return (
      <div className="flex items-center justify-center h-32 font-bold gap-3 rounded-md">
        <h1>File not found or expired</h1>
        <X size={32} />
      </div>
    )
  }

  return (
    <div className="border">
      <h1>{file.name}</h1>
      <p>{file.createdAt}</p>
    </div>
  )
}
