export const loadNotes = async () => {
  const notes = await window.context.getNotes()
  
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime )
} 
