import React from "react"
import Papa from "papaparse"

function loadFile(event: React.ChangeEvent<HTMLInputElement>) {
  if (event.target.files == null || event.target.files.length < 1) {
    return
  }
  const file = event.target.files[0]
  Papa.parse(file, {
    header: true,
    dynamicTyping: false,
    complete: results => {
      console.log(results)
    }
  })
}

export default function ImportCsvContainer() {
  return <input type="file" id="ImportCsvButton" onChange={loadFile} />
}
