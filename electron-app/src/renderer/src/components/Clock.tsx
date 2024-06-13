import { Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

export const Clock = () => {
  let time = new Date().toLocaleTimeString()
  const [ctime, setTime] = useState(time)
  const intervalRef = useRef<NodeJS.Timeout>()

  const UpdateTime = () => {
    time = new Date().toLocaleTimeString()
    setTime((prev) => (prev.includes(':') ? time.replaceAll(':', ' ') : time))
  }

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(UpdateTime, 1000)
    }
  }, [])

  return <Typography variant="h2">{ctime}</Typography>
}
