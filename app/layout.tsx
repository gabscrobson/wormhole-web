import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wormhole',
  description: 'File transfer made easier',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <div className="p-2 w-11/12 m-auto max-w-screen-sm">
          <Link href="/" className="flex justify-center mb-5">
            <Image src="/namelogo.svg" alt="Logo" width={250} height={300} />
          </Link>
          {children}
        </div>
      </body>
    </html>
  )
}
