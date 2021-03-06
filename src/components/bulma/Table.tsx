import React, { ReactNode } from "react"
import "./Table.sass"

export interface TableProps {
  header: ReadonlyArray<ReactNode>
  body: ReadonlyArray<ReadonlyArray<ReactNode>>
}

export default (props: TableProps) => (
  <div className="table-container">
    <table className="table">
      <thead>
        <tr>
          {props.header.map((headerElement, index) => (
            <th key={index}>{headerElement}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.body.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((item, columnIndex) => (
              <td key={columnIndex}>{item}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
