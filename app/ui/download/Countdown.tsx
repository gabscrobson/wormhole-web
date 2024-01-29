'use client'

import { useEffect, useState } from 'react'

interface CountdownProps {
  createdAt: string
}

export default function Countdown({ createdAt }: CountdownProps) {
  // Initial time left is 24 hours in milliseconds
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60 * 1000)

  useEffect(() => {
    const createdAtMil = new Date(createdAt).getTime() // Convert createdAt to milliseconds
    const now = new Date().getTime() // Get current time in milliseconds
    const diff = now - createdAtMil // Calculate the difference
    setTimeLeft(24 * 60 * 60 * 1000 - diff) // Subtract the difference from 24 hours

    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1000) // Decrease time left by 1 second every second
    }, 1000)

    return () => clearInterval(intervalId) // Clear interval on component unmount
  }, [createdAt])

  if (timeLeft <= 0) {
    return <strong>File will be deleted soon</strong>
  }

  return <strong>{new Date(timeLeft).toISOString().substring(11, 19)}</strong>
}
