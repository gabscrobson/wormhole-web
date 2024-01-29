import Link from 'next/link'
import { Button } from './ui/Button'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center flex-col mt-10">
      <h1 className="text-bold text-5xl">404</h1>
      <p className="text-md">Could not find requested resource</p>
      <Button variant={'link'} asChild>
        <Link href="/" className="text-md">
          Return Home
        </Link>
      </Button>
    </div>
  )
}
