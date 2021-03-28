import React, { useEffect, useState } from "react"
import Papa from "papaparse"
import Modal from "./bulma/Modal"
import CsvTable from "./CsvTable"
import { isReadonlyNonEmptyArray } from "../lib/nonEmptyArray"
import ImportCsvConfig from "./ImportCsvConfig"
import { defaultConfig } from "../lib/importCsv"

interface LoadCsvModalProps {
  csvInput: Papa.ParseResult<Record<string, string>>
  updatePortfolio: () => void
  cancel: () => void
}

export default (props: LoadCsvModalProps) => {
  const [config, setConfig] = useState(defaultConfig)
  useEffect(() => {
    chrome.storage.sync.get(["importCsvConfig"], result => {
      if (result.importCsvConfig) {
        setConfig(result.importCsvConfig)
      }
      console.log(`Config loaded: ${JSON.stringify(result)}`)
    })
  }, [])
  const onSave = () => {
    chrome.storage.sync.set({ importCsvConfig: config }, () => {
      console.log(`Config saved: ${JSON.stringify(config)}`)
    })
    props.updatePortfolio()
  }
  return (
    <Modal title="Load csv" onSave={onSave} onCancel={props.cancel}>
      {isReadonlyNonEmptyArray(props.csvInput.data) ? (
        <div>
          <ImportCsvConfig
            config={config}
            inputData={props.csvInput.data}
            updateConfig={setConfig}
          />
          <CsvTable data={props.csvInput.data} />
        </div>
      ) : (
        <div>No data</div>
      )}
    </Modal>
  )
}
