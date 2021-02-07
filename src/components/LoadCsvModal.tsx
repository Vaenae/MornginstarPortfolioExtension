import React from "react"
import Papa from "papaparse"
import Modal from "./Modal"
import CsvTable from "./CsvTable"

interface LoadCsvModalProps {
  csvInput: Papa.ParseResult<Record<string, string>>
  updatePortfolio: () => void
  cancel: () => void
}

export default (props: LoadCsvModalProps) => (
  <Modal
    title="Load csv"
    onSave={props.updatePortfolio}
    onCancel={props.cancel}
  >
    <CsvTable data={props.csvInput.data} />
  </Modal>
)
