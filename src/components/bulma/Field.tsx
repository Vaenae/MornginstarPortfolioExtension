import React, { ReactNode } from "react"
import "./Field.sass"

export interface FieldProps {
  label: string
  children: ReactNode
}

export default (props: FieldProps) => (
  <div className="field is-grouped">
    <label className="label">{props.label}</label>
    {props.children}
  </div>
)
