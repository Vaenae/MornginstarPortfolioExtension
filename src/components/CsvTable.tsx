import React from "react"
import Table from "./Table"

interface CsvTableProps {
  data: ReadonlyArray<Record<string, string>>
}

export default (props: CsvTableProps) => {
  if (props.data.length === 0) {
    return <div>No data</div>
  }
  const header = Object.keys(props.data[0])
  const body = props.data.map(row => Object.values(row))
  return <Table header={header} body={body} />
}
