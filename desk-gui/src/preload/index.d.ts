import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      getGroupedDaily: GetGroupedDaily
      getAllTickers: GetAllTickers
    }
  }
}
