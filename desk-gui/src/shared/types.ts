import { AllTickers, GroupedDaily, NoteContent, NoteInfo, StockAggregate } from './models'

export type GetNotes = () => Promise<NoteInfo[]>
export type ReadNote = (title: NoteInfo['title']) => Promise<NoteContent>

export type GetExchanges = (auth: string) => Promise<string[]>
export type GetAllTickers = (auth: string) => Promise<AllTickers>
export type GetStocks = (tickers: string[], auth: string) => Promise<StockAggregate>
export type GetGroupedDaily = (tickers: string[], auth: string) => Promise<GroupedDaily>
