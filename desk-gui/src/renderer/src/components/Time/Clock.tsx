import Typography from '@mui/material/Typography'
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

  return (
    <Typography variant="h1" noWrap sx={{ zIndex: 1000 }}>
      {ctime}
    </Typography>
  )
}
