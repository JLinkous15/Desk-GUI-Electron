import AvTimerIcon from '@mui/icons-material/AvTimer'
import ClearIcon from '@mui/icons-material/Clear'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import PauseIcon from '@mui/icons-material/Pause';
import { Stack, Typography, styled } from '@mui/material'
import { useRef, useState } from 'react'
import { TactileIconButton } from '../Common/TactileIconButton';

//Local parameterized measures to be used for rendering. Able to be reassigned programmatically
const knobSize = window.innerHeight * 0.5
const knobHandSize = knobSize * 0.16

type Vertice = {
  dx: number
  dy: number
  angle?: number
}

const TimerKnobHousing = styled(Stack)(({ theme }) => ({
  width: `${knobSize}px`,
  height: `${knobSize}px`,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  boxShadow: [
    `${knobSize * 0.1}px ${knobSize * 0.1}px ${knobSize * 0.2}px ${theme.palette.shadow}`,
    `-${knobSize * 0.1}px -${knobSize * 0.1}px ${knobSize * 0.2}px ${theme.palette.highlight}`,
    `inset ${knobSize * 0.22}px ${knobSize * 0.22}px ${knobSize * 0.44}px ${theme.palette.shadow}`,
    `inset -${knobSize * 0.22}px -${knobSize * 0.22}px ${knobSize * 0.44}px ${theme.palette.highlight}`,
  ].join(','),
  // border: `5px solid ${theme.palette.background.default}`,
  position: 'relative',
}))

const TimerHand = styled(FingerprintIcon)(({ theme }) => ({
  height: knobHandSize,
  width: knobHandSize,
  position: 'absolute',
  top: '10%',
  padding: 12,
  left: `calc(50% - ${knobHandSize / 2}px)`,
  cursor: 'move',
  userSelect: 'none',
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '50%',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.primary.main,
}))

const TimerHandLine = styled('div')({
  width: '1px',
  height: `${knobSize / 4}px`,
  border: `1px solid transparent`,
  position: 'absolute',
  top: `${knobSize / 3.4}px`,
  left: '50%',
})

console.log(knobSize)

const getAngle = (point: Vertice) => {
  if (point.dx < 0 && point.dy > 0) {
    return 360 + (Math.atan(point.dx / point.dy) * 180) / Math.PI
  }
  if (point.dx > 0 && point.dy < 0) {
    return 180 + (Math.atan(point.dx / point.dy) * 180) / Math.PI
  }
  if (point.dx < 0 && point.dy < 0) {
    return 180 + (Math.atan(point.dx / point.dy) * 180) / Math.PI
  }
  return (Math.atan(point.dx / point.dy) * 180) / Math.PI
}

export const Timer = () => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const parentElement = useRef(null)
  const handElement = useRef({
    dx: 0,
    dy: 0,
  })
  const [vertices, setVertices] = useState<Vertice>({
    dx: 0,
    dy: 0,
    angle: 0,
  })

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    if (e && parentElement.current) {
      const parentEl: DOMRect = (
        parentElement.current as HTMLElement
      ).getBoundingClientRect()
      const parent = {
        dx: parentEl.x + parentEl.width / 2,
        dy: parentEl.y + parentEl.height / 2,
      }
      setVertices((prev) => ({ ...prev, ...parent }))
      setIsMouseDown(true)
    }
  }


  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    if (e) {
      setIsMouseDown(false)
    }
  }

  return (
    <>
    <TimerKnobHousing>
      <div
        ref={parentElement}
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        >
      </div>
      <TactileIconButton
        size="large"
        color="primary"
        sx={{
          width: `${knobHandSize}px`,
          height: `${knobHandSize}px`,
        }}
        >
      </TactileIconButton>
      <TimerHand />
    </TimerKnobHousing>
    <Typography fontSize={'48px'}>00:00:00</Typography>
        </>
  )
}
