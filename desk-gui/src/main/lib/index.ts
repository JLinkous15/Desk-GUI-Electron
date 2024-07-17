import { appDirectoryName, fileEncoding } from "@shared/constants"
import { NoteInfo } from "@shared/models"
import { GetNotes, ReadNote } from "@shared/types"
import fs from "fs-extra"
const { ensureDir, readdir, stat, readFile } = fs
import { homedir } from "os"

//get the directory to store files -- .md formarkdown and .cmd for command
export const getRootDir = () => `${homedir()}/${appDirectoryName}`

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  if (rootDir) await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {encoding: fileEncoding, withFileTypes: false})

  const notes = notesFileNames.filter((note) => note.endsWith('.md'))

  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${fileName}`)
  return ({
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStats.birthtimeMs
  })
}

export const readNote: ReadNote = async(filename) => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${filename}.md`, {encoding: fileEncoding})
}