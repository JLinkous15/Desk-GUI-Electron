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
    CUSTOM = 'custom',
  }

  export type TimerReducerAction = any

  export type TimeState = {
    totalTime: number
    duration: number
    relativeAngle: number
    isCounting: boolean
  }

  export type TimeTypePreset = {
    label: string
    duration: number
  }

  export type TimeTypeEntry = {
    label: string
    maxTime: number
    presets: TimeTypePreset[]
    body: string
  }

  export type Vertice = {
    dx: number
    dy: number
    angle?: number
  }
}
