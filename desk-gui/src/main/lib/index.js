import fs from "fs-extra"
import { homedir } from "os"

const { ensureDir, readdir, stat } = fs

export const appDirectoryName = 'Notes' //insert file name to be appended to root, created in main/lib/index.ts
export const fileEncoding = 'utf8'

//get the directory to store files -- .md formarkdown and .cmd for command
export const getRootDir = () => {
return `${homedir()}/${appDirectoryName}`
}

export const getNotes = async () => {
  const rootDir = getRootDir()

  if (rootDir) await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {encoding: fileEncoding, withFileTypes: false})

  const notes = notesFileNames.filter((note) => note.endsWith('.md'))

  return Promise.all(notes.map(getNoteInforFromFilename))
}

export const getNoteInforFromFilename = async (fileName) => {
  const fileStats = await stat(`${getRootDir()}/${fileName}`)
  return ({
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  })
}

getNotes().then((res) => {
  console.log(res)
}).catch(() => console.log("err"))
  
export const readNote = async(filename) => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${filename}.md`, {encoding: fileEncoding})
}