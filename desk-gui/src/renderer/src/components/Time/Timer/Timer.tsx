import AvTimerIcon from '@mui/icons-material/AvTimer'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import PauseIcon from '@mui/icons-material/Pause'
import RefreshIcon from '@mui/icons-material/Refresh'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import { Reducer, useEffect, useReducer, useRef, useState } from 'react'
import { TactileIconButton } from '../../Common/TactileIconButton'
import { TimerType } from './timerTypes'
import { defaultTimerIntervals, getAngle, initialTimer, timeParser, timerReducer } from './TimerHelpers'
import { TimerSelection } from './TimerSelection'
import { IconButton } from '@mui/material'

const timerSize = window.innerHeight * 0.5 //360
const knobHandDiameter = timerSize * 0.74 //266.4
const knobHandSize = timerSize * 0.2
const radius = timerSize * 0.314
const circumference = radius * Math.PI * 2

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
  top: knobHandSize / 2,
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
  const TimerIntervalRef = useRef<NodeJS.Timeout | number | undefined>(undefined)
  const parentElement = useRef(null)
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const timerInterval = useRef<TimerType.TimerIntervalObj>(defaultTimerIntervals)
  const [vertices, setVertices] = useState<TimerType.Vertice>({
    dx: 0,
    dy: 0,
    angle: 0
  })
  const [newTimer, dispatch] = useReducer<Reducer<any, any>>(timerReducer, initialTimer)

  const dashOffset = circumference * (newTimer.relativeAngle / 360)

  useEffect(() => {
    clearInterval(TimerIntervalRef.current)
  }, [])

  const setTimerDrag = (newValue: { duration: number, totalTime: number, type: TimerType.TimerEnum, isWork: boolean }) => {
    dispatch({ type: TimerType.TimerActionEnum.SET, value: newValue })
  }

  const handleStart = () => {
    dispatch({ type: TimerType.TimerActionEnum.OPTIMISTIC_START })
    const id = setInterval(() => {
      dispatch({ type: TimerType.TimerActionEnum.START, value: timerInterval })
    }, 1000)
    TimerIntervalRef.current = id
  }

  const handlePause = () => {
    dispatch({ type: TimerType.TimerActionEnum.PAUSE, value: TimerIntervalRef.current })
    TimerIntervalRef.current = undefined
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    if (e && parentElement.current) {
      const parentEl: DOMRect = (parentElement.current as HTMLElement).getBoundingClientRect()
      const parent = {
        dx: parentEl.x + parentEl.width / 2,
        dy: parentEl.y + parentEl.height / 2
      }
      setVertices((prev) => ({ ...prev, ...parent }))
      setIsMouseDown(true)
      if (TimerIntervalRef.current){
        handlePause()
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    if (isMouseDown && e) {
      const verticesCopy = { ...vertices }
      const variable = {
        dx: e.clientX - verticesCopy.dx,
        dy: verticesCopy.dy - e.clientY
      }
      const angle = getAngle(variable)

      const newValue = {
        ...newTimer, 
        duration: newTimer.totalTime * (angle / 360),
        totalTime: newTimer.totalTime,
        relativeAngle: angle,
      }
      setTimerDrag(newValue)
    }
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  const handleButton = () => {
    if (!newTimer.isCounting && newTimer.duration > 999) {
      handleStart()
    } else {
      handlePause()
    }
  }

  const handleResetButton = () => {
    dispatch({ type: TimerType.TimerActionEnum.RESET, value: TimerIntervalRef.current })
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
              <stop offset="0%" stopColor={theme.palette.primary.main} />
              <stop offset="100%" stopColor={theme.palette.primary.main + '50'} />
            </linearGradient>
          </defs>
          <circle
            cx={timerSize / 2}
            cy={timerSize / 2}
            strokeWidth={'10px '}
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
            strokeWidth={'10px'}
            strokeOpacity={'100%'}
            r={knobHandDiameter / 2 - 20}
            style={{
              position: 'absolute',
              fill: 'none',
              stroke: `${newTimer.duration ? 'url(#Gradient1)' : 'transparent'}`,
              strokeDasharray: circumference,
              strokeDashoffset: -dashOffset,
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
            transform: `rotate(${newTimer.relativeAngle}deg)`
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <TimerHand sx={{ transform: `rotate(-${newTimer.relativeAngle}deg)` }} />
        </div>
        <TactileIconButton
          size="large"
          color="primary"
          onClick={handleButton}
          sx={{
            width: `${knobHandSize}px`,
            height: `${knobHandSize}px`
          }}
        >
          {!newTimer.isCounting ? (
            <AvTimerIcon sx={{ color: 'white', fontSize: '48px' }} />
          ) : (
            <PauseIcon sx={{ color: 'white', fontSize: '48px' }} />
          )}
        </TactileIconButton>
      </TimerKnobHousing>
      <Stack direction="row">
        <Typography
          fontSize={'48px'}
          sx={{ zIndex: 1000, alignSelf: 'center', textAlign: 'center', color: !newTimer.isWork ? theme.palette.primary.main : "undefined" }}
        >
          {timeParser(newTimer.duration)}
        </Typography>
        {!newTimer.duration || (
          <IconButton onClick={handleResetButton} sx={{ position: 'absolute', right: 30 }}>
            <RefreshIcon sx={{ fontSize: '48px', color: !newTimer.isWork ? theme.palette.primary.main : "undefined" }} />
          </IconButton>
        )}
      </Stack>
      <TimerSelection 
      timerState={newTimer} 
      dispatch={dispatch} 
      timerInterval={timerInterval} 
      />
    </>
  )
}
