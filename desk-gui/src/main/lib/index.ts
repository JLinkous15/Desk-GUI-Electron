import {
  appDirectoryName,
  exchangesURL,
  fileEncoding,
  groupedDailyBaseUrl,
  tickersURL
} from '@shared/constants'
import { AllTickers, Exchanges, NoteInfo, TickerResponse } from '@shared/models'
import { GetAllTickers, GetExchanges, GetGroupedDaily, GetNotes, ReadNote } from '@shared/types'
import fs from 'fs-extra'
const { ensureDir, readdir, stat, readFile } = fs
import { homedir } from 'os'

//get the directory to store files -- .md formarkdown and .cmd for command
export const getRootDir = () => `${homedir()}/${appDirectoryName}`

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  if (rootDir) await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, { encoding: fileEncoding, withFileTypes: false })

  const notes = notesFileNames.filter((note) => note.endsWith('.md'))

  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${fileName}`)
  return {
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStats.birthtimeMs
  }
}

export const readNote: ReadNote = async (filename) => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}

export const getExchanges: GetExchanges = async (auth: string) => {
  const headers = new Headers()
  headers.set('Authorization', auth)
  headers.set('Content-Type', 'application/json')

  let exchangeAcronyms: string[] = []

  const url = exchangesURL
  await fetch(url, {
    headers: headers
  })
  .then((res) => res.json())
  .then((res: Exchanges) => {
    if (res) {
      res.results.forEach((result) => {
        exchangeAcronyms.push(result.acronym)}
      )
    }
  })

  return exchangeAcronyms
}

export const getAllTickers: GetAllTickers = async(auth: string) => {
  const exchanges = await getExchanges(auth)

  if (exchanges.length > 0) {
    const headers = new Headers()
    headers.set('Authorization', auth)
    headers.set('Content-Type', 'application/json')

    const url = tickersURL

    const tickers: TickerResponse['results'] = []

    const promises = exchanges.map((exchange) => {
      const queryParam = `?exchange=${exchange}`
      return (
        fetch(url + queryParam, {
          headers: headers
        })
        .then((res) => res.json())
        .then((res: TickerResponse) => {
          tickers.concat(res.results)
        })
      )
    })

    const handleGroupBy = ({market}) => market

    Promise.all(promises)
    return Object.groupBy(tickers, handleGroupBy)
  }


}

export const getGroupedDaily = async (
  tickers: string[],
  auth: string
): Promise<GetGroupedDaily[]> => {
  let date = new Date()
  const formatedDate = date.toISOString().split('T')[0]

  const headers = new Headers()
  headers.set('Authorization', auth)
  headers.set('Content-Type', 'application/json')

  let stockResponse: GetGroupedDaily[] = []

  const stocks = tickers.map((ticker) => {
    const url = [groupedDailyBaseUrl, ticker, formatedDate].join('/')
    fetch(url, {
      headers: headers
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res) return
        stockResponse.push(res)
      })
  })
  await Promise.all(stocks)

  return stockResponse
}
