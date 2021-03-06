import Papa from "papaparse"
import { joinGuards, keyGuard, Literal } from "./stringLiteralTypes"

export const buySellKeyGuard = keyGuard("buy", "sell", "sellAll")
export type BuySellEvent = Literal<typeof buySellKeyGuard>
export const dividendEventKeyGuard = keyGuard("dividend")
export type DividendEvent = Literal<typeof dividendEventKeyGuard>
export const splitEventKeyGuard = keyGuard("split")
export type SplitEvent = Literal<typeof splitEventKeyGuard>
export const eventTypeKeyGuard = joinGuards(
  buySellKeyGuard,
  dividendEventKeyGuard,
  splitEventKeyGuard
)
export type EventType = Literal<typeof eventTypeKeyGuard>
export interface EventTypeOptions {
  column: string | null
  value: string | null
}
export type EventTypeConfig = Record<EventType, EventTypeOptions>
export const otherFieldKeyGuard = keyGuard(
  "name",
  "shares",
  "date",
  "currency",
  "price",
  "comission"
)
export type OtherField = Literal<typeof otherFieldKeyGuard>
export type OtherFieldConfig = Record<OtherField, string | null>
export type ImportCsvConfig = EventTypeConfig & OtherFieldConfig
export const importCsvConfigKeyGuard = joinGuards(
  eventTypeKeyGuard,
  otherFieldKeyGuard
)

export const defaultConfig: ImportCsvConfig = {
  buy: { column: null, value: null },
  sell: { column: null, value: null },
  sellAll: { column: null, value: null },
  dividend: { column: null, value: null },
  split: { column: null, value: null },
  name: null,
  shares: null,
  date: null,
  currency: null,
  price: null,
  comission: null
}

export type ParseResults = Papa.ParseResult<Record<string, string>>

export function parseFile(file: File): Promise<ParseResults> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      dynamicTyping: false,
      complete: results => resolve(results),
      error: errors => reject(errors)
    })
  })
}
