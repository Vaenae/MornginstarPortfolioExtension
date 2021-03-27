import React, { ReactNode } from "react"
import "./Field.sass"

export interface FieldProps {
  label: string
  children: ReactNode
}

export default (props: FieldProps) => (
  <div>
    <p>{props.label}</p>
    <div className="field is-grouped is-grouped-multiline">
      {props.children}
    </div>
  </div>
)
