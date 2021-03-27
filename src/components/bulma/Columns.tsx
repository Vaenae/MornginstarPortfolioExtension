import React, { ReactNode } from "react"
import "./Columns.sass"

interface ColumnsProps {
  children: ReadonlyArray<ReactNode>
  multiline?: boolean
}

const getClassNames = (classNames: Record<string, boolean>): string =>
  Object.keys(classNames)
    .filter(className => classNames[className])
    .join(" ")

export default (props: ColumnsProps) => {
  const classNames = getClassNames({
    columns: true,
    "is-multiline": !!props.multiline
  })
  return <div className={classNames}>{...props.children}</div>
}
