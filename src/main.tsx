import React from "react"
import { render } from "react-dom"
import ImportCsvContainer from "./components/ImportCsvContainer"

const holdingPanelElement = document.getElementById(
  "ctl00_ctl00_MainContent_PM_MainContent_AddHoldingPanel"
)
const newElement = document.createElement("div")
newElement.id = "loadCsvContainer"
holdingPanelElement?.appendChild(newElement)

render(<ImportCsvContainer />, newElement)
