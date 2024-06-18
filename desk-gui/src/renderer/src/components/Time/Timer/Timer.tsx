import AvTimerIcon from '@mui/icons-material/AvTimer'
import ClearIcon from '@mui/icons-material/Clear'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import PauseIcon from '@mui/icons-material/Pause'
import { Stack, Typography, styled, useTheme } from '@mui/material'
import { Reducer, useEffect, useReducer, useRef, useState } from 'react'
import { TactileIconButton } from '../../Common/TactileIconButton'
import { TimerType } from './timerTypes'
import { getAngle, initialTimer, timerReducer } from './TimerHelpers'

const timerSize = window.innerHeight * 0.5
const knobHandDiameter = timerSize * 0.74
const knobHandSize = timerSize * 0.16

const TimerKnobHousing = styled(Stack)(({ theme }) => ({
  width: `${timerSize}px`,
  height: `${timerSize}px`,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  boxShadow: [
    `${timerSize * 0.1}px ${timerSize * 0.1}px ${timerSize * 0.2}px ${theme.palette.shadow}`,
    `-${timerSize * 0.1}px -${timerSize * 0.1}px ${timerSize * 0.2}px ${theme.palette.highlight}`,
    `inset ${timerSize * 0.22}px ${timerSize * 0.22}px ${timerSize * 0.44}px ${theme.palette.shadow}`,
    `inset -${timerSize * 0.22}px -${timerSize * 0.22}px ${timerSize * 0.44}px ${theme.palette.highlight}`
  ].join(','),
  // border: `5px solid ${theme.palette.background.default}`,
  position: 'relative'
}))

const TimerHand = styled(FingerprintIcon)(({ theme }) => ({
  height: knobHandSize,
  width: knobHandSize,
  position: 'absolute',
  top: timerSize * 0.13,
  padding: 12,
  left: `calc(50% - ${knobHandSize / 2}px)`,
  cursor: 'move',
  userSelect: 'none',
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '50%',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.primary.main
}))

export const Timer = () => {
  const theme = useTheme()
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const TimerIntervalRef = useRef(null)
  const parentElement = useRef(null)
  const [vertices, setVertices] = useState<TimerType.Vertice>({
    dx: 0,
    dy: 0,
    angle: 0
  })
  const handElement = useRef({
    dx: 0,
    dy: 0
  })

  const [newTimer, dispatch] = useReducer<Reducer<any, any>>(timerReducer, initialTimer)
  const radius = knobHandDiameter / 2 - 20
  const circumference = radius * Math.PI * 2
  const dashOffset = circumference * (newTimer.relativeAngle / 360)

  useEffect(() => {
    //@ts-ignore
    clearInterval(TimerIntervalRef.current)
  }, [])

  if (newTimer.duration <= 1000) {
    clearInterval(TimerIntervalRef.current)
    TimerIntervalRef.current = null
  }

  const setTimerDrag = (newTime: { duration: number; totalTime: number }) => {
    dispatch({ type: TimerType.TimerActionEnum.SET, value: newTime })
  }

  const handleMouseDown = (e: any) => {
    if (e && parentElement.current) {
      const parentEl: DOMRect = (parentElement.current as HTMLElement).getBoundingClientRect()
      const parent = {
        dx: parentEl.x + parentEl.width / 2,
        dy: parentEl.y + parentEl.height / 2
      }

      console.log(parent)
      setVertices((prev) => ({ ...prev, ...parent }))
      setIsMouseDown(true)
    }
  }

  const handleMouseMove = (e: any) => {
    if (isMouseDown && e) {
      const verticesCopy = { ...vertices }
      handElement.current = {
        ...handElement.current,
        dx: e.clientX - verticesCopy.dx,
        dy: verticesCopy.dy - e.clientY
      }
      const angle = getAngle(handElement.current)
      const newValue = {
        duration: newTimer.totalTime * (angle / 360),
        totalTime: newTimer.totalTime,
        relativeAngle: angle
      }
      setTimerDrag(newValue)
    }
  }

  const handleMouseUp = (e: any) => {
    if (e) {
      setIsMouseDown(false)
    }
  }

  return (
    <>
      <TimerKnobHousing>
          <svg
            width={timerSize}
            height={timerSize}
            viewBox={`0 0 ${timerSize} ${timerSize}`}
            style={{
              position: 'absolute',
              transform: 'rotate(-90deg)'
            }}
          >
            <defs>
              <linearGradient id="Gradient1">
                <stop offset="0%" stopColor={theme.palette.primary.main + '50'} />
                <stop offset="100%" stopColor={theme.palette.primary.main} />
              </linearGradient>
            </defs>
            <circle
              cx={timerSize / 2}
              cy={timerSize / 2}
              strokeWidth={'15px '}
              strokeOpacity={'100%'}
              r={knobHandDiameter / 2 - 20}
              style={{
                fill: 'none',
                stroke: `${theme.palette.highlight}`
              }}
            />
            <circle
              cx={timerSize / 2}
              cy={timerSize / 2}
              strokeWidth={'15px'}
              strokeOpacity={'100%'}
              r={knobHandDiameter / 2 - 20}
              style={{
                position: 'absolute',
                fill: 'none',
                stroke: `url(#Gradient1)`,
                strokeDasharray: circumference,
                strokeDashoffset: dashOffset,
                strokeLinecap: 'round'
              }}
            />
          </svg>
        <div
          ref={parentElement}
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            transform: `rotate(${-newTimer.relativeAngle}deg)`
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <TimerHand sx={{ transform: `rotate(${newTimer.relativeAngle}deg)` }} />
        </div>
        <TactileIconButton
          size="large"
          color="primary"
          sx={{
            width: `${knobHandSize}px`,
            height: `${knobHandSize}px`
          }}
        ></TactileIconButton>
      </TimerKnobHousing>
      <Typography fontSize={'48px'}>00:00:00</Typography>
    </>
  )
}
