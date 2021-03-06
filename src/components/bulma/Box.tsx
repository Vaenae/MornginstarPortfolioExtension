import React, { ReactNode } from "react"
import "./Box.sass"

interface BoxProps {
  children: ReactNode
}

export default (props: BoxProps) => <div className="box">{props.children}</div>
