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
    return <div>File not found</div>
  }

  return (
    <div>
      <h1>{file.name}</h1>
      <p>{file.createdAt}</p>
    </div>
  )
}
