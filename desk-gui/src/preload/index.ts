import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { GetAllTickers, GetGroupedDaily, GetNotes, ReadNote } from '@shared/types'

const api = {}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('context', {
      locale: navigator.language,
      getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
      readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args),
      getGroupedDaily: (...args: Parameters<GetGroupedDaily>) =>
        ipcRenderer.invoke('getDailyStocks', ...args),
      getAllTickers: (...args: Parameters<GetAllTickers>) =>
        ipcRenderer.invoke('getAllTickers', ...args)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
