import { TabContext } from "@renderer/App"
import { useContext, useState } from "react"
import { Todos } from "./Todos/Todos"
import { Sensors } from "./Sensors/Sensors"
import { GoogleHome } from "./GoogleHome/GoogleHome"
import { Stocks } from "./Stocks/Stocks"
import { styled } from "@mui/material/styles"
import { tabArray } from "@renderer/components/Nav/Nav"

const PanelBox = styled('div')(({theme}) => ({
  border: `1px solid ${theme.palette.text.disabled}`, 
  height: 'calc(83.4% - 90px)'
}))

export const Panels = () => {
  const {tab, setTab} = useContext(TabContext)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    if (!e) return
    console.log(e)
    setTouchEnd(null)
    setTouchStart(e.clientY)
  }
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    if (!e) return
    setTouchEnd(e.clientY)
  }

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd) return
    if (touchStart - touchEnd > 0 && tab < tabArray.length - 1) setTab(tab + 1)
    if (touchStart - touchEnd < 0 && tab > 0) setTab(tab - 1)
  }

  return (
    <PanelBox onMouseDown={handleMouseDown}  onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {tab === 0 && <Todos />}
      {tab === 1 && <GoogleHome />}
      {tab === 2 && <Sensors />}
      {tab === 3 && <Stocks />}
    </PanelBox>
  )
}