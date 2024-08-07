export type NoteInfo = {
  title: string
  lastEditTime: number
}

export type NoteContent = string

export type AssetClass = "stocks" | "crypto" | "options" | "fx"

export type Exchanges = {
  count: number
  request_id: string
  results:
    {
      acronym: string //necessary for future query params
      asset_class: AssetClass //great for filtering. Will consider querying by asset class to minimize payload.
      id: string
      locale: string //ISO locale string
      mic: string
      name: string
      operating_mic: string
      participant_id: string
      type: string
      url: string
    }[]
  status: string
}

export type TickerResponse = {
  count: number
  next_url: string
  request_id: string
  results: {
      active: boolean
      cik: string
      composite_figi: string
      currency_name: string
      last_updated_utc: string,
      locale: "us",
      market: AssetClass
      name: string
      primary_exchange: string
      share_class_figi: string
      ticker: string
      type: string
    }[]
  ,
  status: string
}

export type AllTickers = Record<AssetClass, {
    ticker: string
    name: string
    market: AssetClass
  }>[]


export type StockAggregate = {
  adjusted: boolean
  next_url: string
  queryCount: number
  request_id: string
  results: {
    c: number
    h: number
    l: number
    n: number
    o: number
    t: number
    v: number
    vw: number
  }[]
  resultsCount: number
  status: string
}

export type GroupedDaily = {
  adjusted: boolean
  queryCount: number
  results: {
    T: string
    c: number
    h: number
    l: number
    n: number
    o: number
    t: number
    v: number
    vw: number
  }[]
  resultsCount: number
  status: string
}
