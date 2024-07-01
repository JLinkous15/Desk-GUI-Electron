export namespace TimerType {
  export enum TimerActionEnum {
    SET = 'set',
    START = 'start',
    RESET = 'reset',
    OPTIMISTIC_START = 'optimistic start',
    PAUSE = 'pause'
  }

  export enum TimerEnum {
    POMODORO = 'pomodoro',
    CUSTOM = 'custom'
  }

  export type TimerReducerAction = any

  export type TimeState = {
    totalTime: number
    duration: number
    relativeAngle: number
    type: TimerType.TimerEnum | undefined
    isWork: boolean
    isCounting: boolean
  }

  export type Vertice = {
    dx: number
    dy: number
    angle?: number
  }

  export type TimerInterval = {
    work: number
    rest: number
  }

  export type TimerIntervalObj = Record<TimerEnum, TimerInterval>
}
