export type NoteInfo = {
  title: string
  lastEditTime: number
}

export type NoteContent = string

export type StockAggregate = {
  adjusted: boolean,
  next_url: string,
  queryCount: number,
  request_id: string,
  results:
    {
      c: number,
      h: number,
      l: number,
      n: number
      o: number,
      t: number,
      v: number,
      vw: number,
    }[],
  resultsCount: number,
  status: string,
}

export type GroupedDaily = {
  adjusted: boolean,
  queryCount: number,
  results:
    {
      T: string,
      c: number,
      h: number,
      l: number,
      n: number
      o: number,
      t: number,
      v: number,
      vw: number,
    }[],
  resultsCount: number,
  status: string,
}