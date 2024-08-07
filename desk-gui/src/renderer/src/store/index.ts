import { NoteInfo } from '../../../shared/models'

//This is a deprecated crud layer that moved across the IPC via context bridging.
//The reason it's being 86'd is for two reasons
//First, the "Eat the Frog" implementation of a todo list only focuses on one at a time, so there's no value in storing multiple todos.
//Second, I would largely be using this for work matters, and it seems legally concerning to have copies of Jira tickets on my home machine.
//Left here to demonstrate patterns for future features. Treat like any fetch request within a useEffect that runs on mount.
// useEffect(() => {
//   loadNotes().then(res => {
//     setNotes(res)
//   })
//   Promise.all(notes.map((note, index) => (
//     readNote(note.title)
//     .then((res) => {
//       setNotes(prev => [...prev, prev[index].content = res])
//     })
//   )))
// }, [])

export const loadNotes = async (): Promise<NoteInfo[]> => {
  const notes = await window.context.getNotes()

  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

export const readNote = async (title: string) => {
  const noteContent = await window.context.readNote(title)
  return noteContent
}

export const getGroupedDaily = async (tickers: string[], auth: string) => {
  const stockInfo = await window.context.getGroupedDaily(tickers, auth)
  return stockInfo
}

export const getAllTickers = async (auth: string) => {
  const tickerInfo = await window.context.getAllTickers(auth)
  return tickerInfo
}
