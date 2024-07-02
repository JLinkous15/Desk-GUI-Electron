import { appDirectoryName, fileEncoding } from "@shared/constants"
import { NoteInfo } from "@shared/models"
import { GetNotes } from "@shared/types"
import { ensureDir, readdir, stat } from "fs-extra"
import { homedir } from "os"

//get the directory to store files -- .md formarkdown and .cmd for command
export const getRootDir = () => {
return `${homedir()}/${appDirectoryName}`
}

//alt solution for storage within the app ?
// export const getRootDir = (): string => {
//     return `${dirname(require.main.filename)}/${appDirectoryName}`
// }

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  if (rootDir) await ensureDir(rootDir)

    const notesFileNames = await readdir(rootDir, {encoding: fileEncoding, withFileTypes: false})

    const notes = notesFileNames.filter((note) => note.endsWith('.md'))

    return Promise.all(notes.map(getNoteInforFromFilename))
}

export const getNoteInforFromFilename = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${fileName}`)
  return ({
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  })
}