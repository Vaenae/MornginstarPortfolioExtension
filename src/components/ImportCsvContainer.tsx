import React, { useState } from "react"
import { parseFile, ParseResults } from "../lib/importCsv"
import LoadCsvModal from "./LoadCsvModal"

export default function ImportCsvContainer() {
  const [parseResult, setParseResult] = useState<ParseResults | undefined>(
    undefined
  )
  async function loadFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files == null || event.target.files.length < 1) {
      return
    }
    const file = event.target.files[0]
    setParseResult(await parseFile(file))
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
