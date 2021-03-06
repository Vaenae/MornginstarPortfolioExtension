import React from "react"
import "./Select.sass"

export interface SelectProps<T extends string> {
  options: ReadonlyArray<T>
  onChange: (newValue: T) => void
}

export default <T extends string>(props: SelectProps<T>) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    props.onChange(event.target.value as T)
  return (
    <div className="control">
      <div className="select">
        <select onChange={onChange}>
          {props.options.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
