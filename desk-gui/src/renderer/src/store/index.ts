import { NoteInfo } from "../../../shared/models"

export const loadNotes = async (): Promise<NoteInfo[]> => {
  const notes = await window.context.getNotes()
  
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime )
} 

export const readNote = async (title: string) => {
  const noteContent = await window.context.readNote(title)
  return noteContent
}
