import { TimerType } from './timerTypes'

export const initialTimer: TimerType.TimeState = {
  totalTime: 600000,
  duration: 0,
  relativeAngle: 0,
  isCounting: false
}

export const timeParser = (n: number) => {
  const seconds = Math.floor((n / 1000) % 60)
    .toString()
    .padStart(2, '0')
  const minutes = Math.floor((n / 1000 / 60) % 60)
    .toString()
    .padStart(2, '0')
  return `${minutes}:${seconds}`
}

export const timerReducer = (state: TimerType.TimeState, action: TimerType.TimerReducerAction) => {
  switch (action.type) {
    case TimerType.TimerActionEnum.SET:
      if (action.value) {
        const { duration, totalTime } = action.value
        return {
          ...state,
          relativeAngle: 360 * (duration / totalTime),
          totalTime: totalTime,
          duration: duration,
          isCounting: false,
          timer: timeParser(duration)
        }
      }
      return state
    case TimerType.TimerActionEnum.RESET:
      clearInterval(action.value)
      return initialTimer
    case TimerType.TimerActionEnum.OPTIMISTIC_START:
      return { ...state, isCounting: true }
    case TimerType.TimerActionEnum.PAUSE:
      clearInterval(action.value)
      return { ...state, isCounting: false }
    case TimerType.TimerActionEnum.START:
      const newDuration = state.duration - 1000
      const newAngle = (newDuration * 360) / state.totalTime
      return {
        ...state,
        duration: newDuration,
        relativeAngle: newAngle,
        timer: timeParser(newDuration),
        isCounting: true
      }
    default:
      return state
  }
}

export const getAngle = (point: TimerType.Vertice) => {
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
