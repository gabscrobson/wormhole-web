import { CSSProperties } from 'react'

interface ProgressBarProps {
  progress: number
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const progressBarStyle: CSSProperties = { width: `${progress}%` }

  return (
    <div className="w-full bg-gray-900 rounded-md">
      <div
        className="bg-purple-500 text-xs font-medium text-blue-100 
        text-center p-0.5 leading-none rounded-full"
        style={progressBarStyle}
      >
        {' '}
        {progress}%
      </div>
    </div>
  )
}
