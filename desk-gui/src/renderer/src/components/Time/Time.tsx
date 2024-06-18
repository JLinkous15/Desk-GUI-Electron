import { styled } from '@mui/material/styles'
import { Clock } from './Clock'
import { Timer } from './Timer/Timer'

const TimeDiv = styled('div')(({ theme }) => ({
  position: 'fixed',
  right: 0,
  padding: '2%',
  display: 'flex',
  height: window.innerHeight,
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center'
}))

export const Time = () => {
  return (
    <TimeDiv>
      <Clock />
      <Timer />
    </TimeDiv>
  )
}
