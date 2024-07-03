import { styled } from '@mui/material/styles'
import { Clock } from './Clock'
import { Timer } from './Timer/Timer'

const TimeDiv = styled('div')({
  display: 'flex',
  height: '100%',
  position: 'sticky',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center'
})

export const Time = () => {
  return (
    <TimeDiv>
      <Clock />
      <Timer />
    </TimeDiv>
  )
}
