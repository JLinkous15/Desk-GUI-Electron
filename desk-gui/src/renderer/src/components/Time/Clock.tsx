import Typography from '@mui/material/Typography'
import { useEffect, useRef, useState } from 'react'

let time = new Date().toLocaleTimeString().substring(0, 8)

export const Clock = () => {
  const [ctime, setTime] = useState(time)
  const intervalRef = useRef<NodeJS.Timeout>()

  const UpdateTime = () => {
    time = new Date().toLocaleTimeString()
    setTime(time.substring(0, 8))
  }

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(UpdateTime, 1000)
    }
  }, [])

  return (
    <Typography variant="h1" noWrap sx={{ zIndex: 1000 }}>
      {ctime}
    </Typography>
  )
}
