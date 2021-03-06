import React from "react"
import { ReadonlyNonEmptyArray } from "../lib/nonEmptyArray"
import Table from "./bulma/Table"

interface CsvTableProps {
  data: ReadonlyNonEmptyArray<Record<string, string>>
}

export default (props: CsvTableProps) => {
  const header = Object.keys(props.data[0])
  const body = props.data.map(row => Object.values(row))
  return <Table header={header} body={body} />
}
