import React, { useCallback, useMemo } from "react"
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
import Field from "./bulma/Field"
import Select from "./bulma/Select"
import Columns from "./bulma/Columns"

interface ColumnAndValueInputProps {
  id: EventType
  columnAndValue: EventTypeOptions
  inputColumnsAndValues: Record<string, ReadonlyArray<string>>
  allColumns: ReadonlyArray<string>
  updateConfigOption: (key: EventType, value: EventTypeOptions) => void
}

const ColumnAndValueInput = (props: ColumnAndValueInputProps) => {
  const { id, updateConfigOption, columnAndValue } = props
  const updateColumn = useCallback(
    (newValue: string | null) =>
      updateConfigOption(id, {
        column: newValue,
        value: null
      }),
    [id, updateConfigOption]
  )
  const updateValue = useCallback(
    (newValue: string | null) =>
      updateConfigOption(id, {
        column: columnAndValue.column,
        value: newValue
      }),
    [id, columnAndValue, updateConfigOption]
  )
  return (
    <div className="columnAndValueInput column is-narrow control">
      <Field label={getText(props.id)}>
        <Select
          options={props.allColumns}
          onChange={updateColumn}
          placeholder={getText("selectColumn")}
          selected={props.columnAndValue.column}
        />
        <Select
          options={
            columnAndValue.column === null
              ? []
              : props.inputColumnsAndValues[columnAndValue.column]
          }
          onChange={updateValue}
          placeholder={getText("selectValue")}
          selected={props.columnAndValue.value}
        />
      </Field>
    </div>
  )
}

interface ColumnInputProps {
  id: OtherField
  column: string | null
  allColumns: ReadonlyArray<string>
  updateConfigOption: (key: OtherField, value: string | null) => void
}

const ColumnInput = (props: ColumnInputProps) => {
  const { id, updateConfigOption } = props
  const updateColumn = useCallback(
    (newValue: string | null) => updateConfigOption(id, newValue),
    [id, updateConfigOption]
  )
  return (
    <div className="columnInput column is-narrow">
      <Field label={getText(props.id)}>
        <Select
          options={props.allColumns}
          onChange={updateColumn}
          placeholder={getText("selectColumn")}
          selected={props.column}
        />
      </Field>
    </div>
  )
}

function sortedUnique<T>(values: ReadonlyArray<T>) {
  const result = Array.from(new Set(values))
  return result.sort()
}

const getInputColumnsAndValues = (
  inputData: ReadonlyNonEmptyArray<Record<string, string>>
): Record<string, ReadonlyArray<string>> => {
  const keys = Object.keys(inputData[0])
  const result = keys.reduce(
    (prev, key) => ({
      [key]: sortedUnique(inputData.map(row => row[key])),
      ...prev
    }),
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
  const { config, updateConfig, inputData } = props
  const inputColumnsAndValues = useMemo(
    () => getInputColumnsAndValues(inputData),
    [inputData]
  )
  const allColumns = useMemo(() => Object.keys(inputColumnsAndValues), [
    inputColumnsAndValues
  ])
  const updateConfigOption = useCallback(
    <T extends keyof ImportCsvConfig>(key: T, value: ImportCsvConfig[T]) => {
      updateConfig({
        ...config,
        [key]: value
      })
    },
    [config, updateConfig]
  )
  return (
    <Box>
      <Columns multiline={true}>
        {importCsvConfigKeyGuard.keys.map(key =>
          eventTypeKeyGuard.typeGuard(key) ? (
            <ColumnAndValueInput
              id={key}
              columnAndValue={config[key]}
              allColumns={allColumns}
              inputColumnsAndValues={inputColumnsAndValues}
              updateConfigOption={updateConfigOption}
              key={key}
            />
          ) : (
            <ColumnInput
              id={key}
              key={key}
              column={config[key]}
              allColumns={allColumns}
              updateConfigOption={updateConfigOption}
            />
          )
        )}
      </Columns>
    </Box>
  )
}
