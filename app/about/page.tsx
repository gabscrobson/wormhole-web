import Link from 'next/link'

export default function Page() {
  const underlineCSS =
    'border border-dashed border-transparent border-b-purple-500 border-b-1'
  const hyperlinkCSS = 'text-purple-500 hover:text-purple-600'

  return (
    <div>
      <p className="text-lg">
        <span className={underlineCSS}>Wormhole</span> is a quick and easy way
        to share files between devices. It can be used via the{' '}
        <Link href="/" className={hyperlinkCSS}>
          Web Application
        </Link>{' '}
        or the{' '}
        <a href="#" className={hyperlinkCSS}>
          Desktop Widget
        </a>
        , available for Windows, macOS, and Linux. The user can upload{' '}
        <span className={underlineCSS}>1GB of files per day</span>, and the
        files are stored for <span className={underlineCSS}>24 hours</span>. The
        user can also share the files with a QR code or a link.
      </p>
    </div>
  )
}
