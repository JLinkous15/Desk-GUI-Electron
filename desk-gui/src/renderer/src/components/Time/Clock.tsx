import { Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

let time = new Date().toLocaleTimeString()

export const Clock = () => {
  const [ctime, setTime] = useState(time)
  const intervalRef = useRef<NodeJS.Timeout>()

  const UpdateTime = () => {
    time = new Date().toLocaleTimeString()
    setTime(time)
  }

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(UpdateTime, 1000)
    }
  }, [])

  return <Typography sx={{ fontSize: `calc(${window.innerHeight}px * 0.1)` }}>{ctime}</Typography>
}
