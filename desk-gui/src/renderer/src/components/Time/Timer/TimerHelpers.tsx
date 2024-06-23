import { TimerType } from './timerTypes'

export const initialTimer: TimerType.TimeState = {
  totalTime: 600000,
  duration: 0,
  isWork: true,
  type: undefined,
  relativeAngle: 0,
  isCounting: false
}

export const defaultTimerIntervals = {
  pomodoro: {
    work: 1500000,
    rest: 300000
  },
  custom: {
    work: 0,
    rest: 0
  }
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
        const { duration, totalTime, type, isWork } = action.value
        return {
          ...state,
          type,
          isWork,
          totalTime,
          duration,
          relativeAngle: 360 * (duration / totalTime),
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
      const {...intervals} = action.value
      let duration = state.duration - 1000
      let relativeAngle = (duration * 360) / state.totalTime
      let isWork = state.isWork
      let totalTime = state.totalTime

      if (duration < 0 && state.type) {
        isWork = !state.isWork
        duration = state.isWork ? intervals.current[state.type].rest : intervals.current[state.type].work
        totalTime = duration
        relativeAngle = 0
      }
      return {
        ...state,
        isWork: isWork,
        relativeAngle: relativeAngle,
        totalTime: totalTime,
        duration: duration,
        timer: timeParser(duration),
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
