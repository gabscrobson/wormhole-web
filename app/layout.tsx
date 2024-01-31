import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/Button'
import { Toaster } from './ui/Toast/toaster'
import { Fragment } from 'react'
import { Separator } from './ui/Separator'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wormhole',
  description: 'File transfer made easier',
  icons: {
    icon: '/logo.svg',
  },
}

const links = [
  {
    title: 'Github',
    href: 'https://github.com/gabscrobson',
  },
  {
    title: 'Widget',
    href: '/widget',
  },
  {
    title: 'About Wormhole...',
    href: '/about',
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <div className="p-2 w-11/12 m-auto max-w-screen-sm h-svh flex flex-col justify-between">
          <div>
            <Link href="/" className="flex justify-center mb-5">
              <Image src="/namelogo.svg" alt="Logo" width={250} height={300} />
            </Link>
            {children}
          </div>
          <footer className="mb-3 flex items-center justify-center">
            {links.map((link, index) => (
              <Fragment key={link.title}>
                <Button variant={'link'} asChild>
                  <Link href={link.href}>{link.title}</Link>
                </Button>
                {index !== links.length - 1 && (
                  <Separator
                    orientation="vertical"
                    className="bg-gray-900 h-5"
                  />
                )}
              </Fragment>
            ))}
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
