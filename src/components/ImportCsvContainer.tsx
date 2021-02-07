import React, { useState } from "react"
import Papa from "papaparse"
import LoadCsvModal from "./LoadCsvModal"

export default function ImportCsvContainer() {
  const [parseResult, setParseResult] = useState<
    Papa.ParseResult<Record<string, string>> | undefined
  >(undefined)
  function loadFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files == null || event.target.files.length < 1) {
      return
    }
    const file = event.target.files[0]
    Papa.parse<Record<string, string>>(file, {
      header: true,
      dynamicTyping: false,
      complete: results => {
        setParseResult(results)
        console.log(results)
      }
    })
  }
  function updatePortfolio() {
    setParseResult(undefined)
  }
  function cancel() {
    setParseResult(undefined)
  }
  return parseResult === undefined ? (
    <input type="file" id="ImportCsvButton" onChange={loadFile} />
  ) : (
    <LoadCsvModal
      csvInput={parseResult}
      updatePortfolio={updatePortfolio}
      cancel={cancel}
    />
  )
}
