import Image from 'next/image'
import Dropzone from './ui/Dropzone'

export default function Home() {
  return (
    <div className="p-2 w-11/12 m-auto max-w-screen-sm">
      <div className="flex justify-center mb-5">
        <Image src="/namelogo.svg" alt="Logo" width={250} height={300} />
      </div>
      <Dropzone />
    </div>
  )
}
