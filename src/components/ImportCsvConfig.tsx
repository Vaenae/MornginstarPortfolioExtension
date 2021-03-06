import React, { useCallback } from "react"
import uniq from "lodash/fp/uniq"
import getText from "../lib/getText"
import {
  importCsvConfigKeyGuard,
  ImportCsvConfig,
  EventTypeOptions,
  eventTypeKeyGuard,
  EventType,
  OtherField
} from "../lib/importCsv"
import { ReadonlyNonEmptyArray } from "../lib/nonEmptyArray"
import Box from "./bulma/Box"
import Columns from "./bulma/Columns"
import Field from "./bulma/Field"
import Select from "./bulma/Select"

interface ColumnAndValueInputProps {
  key: EventType
  columnAndValue: EventTypeOptions
  inputColumnsAndValues: Record<string, ReadonlyArray<string>>
  allColumns: ReadonlyArray<string>
  updateConfigOption: (key: EventType, value: EventTypeOptions) => void
}

const ColumnAndValueInput = (props: ColumnAndValueInputProps) => {
  const { key, updateConfigOption, columnAndValue } = props
  const updateColumn = useCallback(
    (newValue: string) =>
      updateConfigOption(key, {
        column: newValue,
        value: null
      }),
    [key, updateConfigOption]
  )
  const updateValue = useCallback(
    (newValue: string) =>
      updateConfigOption(key, {
        column: columnAndValue.column,
        value: newValue
      }),
    [key, columnAndValue, updateConfigOption]
  )
  return (
    <div>
      <Field label={getText(props.key)}>
        <Select options={props.allColumns} onChange={updateColumn} />
        {columnAndValue.column !== null ? (
          <Select
            options={props.inputColumnsAndValues[columnAndValue.column]}
            onChange={updateValue}
          />
        ) : null}
      </Field>
    </div>
  )
}

interface ColumnInputProps {
  key: OtherField
  column: string | null
  allColumns: ReadonlyArray<string>
  updateConfigOption: (key: OtherField, value: string | null) => void
}

const ColumnInput = (props: ColumnInputProps) => {
  const { key, updateConfigOption } = props
  const updateColumn = useCallback(
    (newValue: string) => updateConfigOption(key, newValue),
    [key, updateConfigOption]
  )
  return (
    <Field label={getText(props.key)}>
      <Select options={props.allColumns} onChange={updateColumn} />
    </Field>
  )
}

const getInputColumnsAndValues = (
  inputData: ReadonlyNonEmptyArray<Record<string, string>>
): Record<string, ReadonlyArray<string>> => {
  const keys = Object.keys(inputData[0])
  const result = keys.reduce(
    (prev, key) => ({ [key]: uniq(inputData.map(row => row[key])), ...prev }),
    {}
  )
  return result
}

interface ImportCsvConfigProps {
  config: ImportCsvConfig
  inputData: ReadonlyNonEmptyArray<Record<string, string>>
  updateConfig: (newConfig: ImportCsvConfig) => void
}

export default (props: ImportCsvConfigProps) => {
  const { config, updateConfig } = props
  const inputColumnsAndValues = getInputColumnsAndValues(props.inputData)
  const updateConfigOption = useCallback(
    <T extends keyof ImportCsvConfig>(key: T, value: ImportCsvConfig[T]) => {
      updateConfig({
        [key]: value,
        ...config
      })
    },
    [config, updateConfig]
  )
  const allColumns = Object.keys(inputColumnsAndValues)
  return (
    <Box>
      <Columns>
        {importCsvConfigKeyGuard.keys.map(key =>
          eventTypeKeyGuard.typeGuard(key) ? (
            <ColumnAndValueInput
              key={key}
              columnAndValue={props.config[key]}
              allColumns={allColumns}
              inputColumnsAndValues={inputColumnsAndValues}
              updateConfigOption={updateConfigOption}
            />
          ) : (
            <ColumnInput
              key={key}
              column={props.config[key]}
              allColumns={allColumns}
              updateConfigOption={updateConfigOption}
            />
          )
        )}
      </Columns>
    </Box>
  )
}
