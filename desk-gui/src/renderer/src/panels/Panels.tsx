//Static Imports
import { Suspense, useContext, useState } from 'react'
import { styled } from '@mui/material/styles'
import { TabContext } from '@renderer/App'
import { tabArray } from '@components/Nav/Nav'
import { lazyImport } from '@utils/lazyImport'
//Dynamic Imports
const Todos = lazyImport('../panels/Todos/Todos.tsx', 'Todos')
const GoogleHome = lazyImport('../panels/GoogleHome/GoogleHome.tsx', 'GoogleHome')
const Sensors = lazyImport('../panels/Sensors/Sensors.tsx', 'Sensors')
const Stocks = lazyImport('../panels/Stocks/Stocks.tsx', 'Stocks')

const PanelBox = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.text.disabled}`,
  height: 'calc(83.4% - 90px)'
}))

export const Panels = () => {
  const { tab, setTab } = useContext(TabContext)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    if (!e) return
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
    <PanelBox onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {tab === 0 && (
        <Suspense fallback={''}>
          <Todos />
        </Suspense>
      )}
      {tab === 1 && (
        <Suspense fallback={''}>
          <GoogleHome />
        </Suspense>
      )}
      {tab === 2 && (
        <Suspense fallback={''}>
          <Sensors />
        </Suspense>
      )}
      {tab === 3 && (
        <Suspense fallback={''}>
          <Stocks />
        </Suspense>
      )}
    </PanelBox>
  )
}
