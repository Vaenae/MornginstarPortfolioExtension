import { render } from "react-dom"
import LoadCsvContainer from "./components/LoadCsvContainer"

const holdingPanelElement = document.getElementById(
  "ctl00_ctl00_MainContent_PM_MainContent_AddHoldingPanel"
)
const newElement = document.createElement("div")
newElement.id = "loadCsvContainer"
holdingPanelElement?.appendChild(newElement)

render(LoadCsvContainer(), newElement)
