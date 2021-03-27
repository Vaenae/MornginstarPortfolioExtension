import React from "react"
import "./Select.sass"

export interface SelectProps<T extends string> {
  options: ReadonlyArray<T>
  onChange: (newValue: T | null) => void
  selected: T | null
  placeholder: string
}

export default <T extends string>(props: SelectProps<T>) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    event.target.value === props.placeholder
      ? props.onChange(null)
      : props.onChange(event.target.value as T)
  const { selected, placeholder } = props
  return (
    <div className="select">
      <select value={selected || placeholder} onChange={onChange}>
        <option key={placeholder} value={placeholder}>
          {placeholder}
        </option>
        {props.options.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}
