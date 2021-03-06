import React, { ReactNode } from "react"
import "./Columns.sass"

interface ColumnsProps {
  children: ReadonlyArray<ReactNode>
}

export default (props: ColumnsProps) => (
  <div className="columns">
    {props.children.map((childNode, index) => (
      <div className="column" key={index}>
        {childNode}
      </div>
    ))}
  </div>
)
