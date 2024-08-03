//Static Imports
import { Suspense, useContext, useState } from 'react'
import { styled } from '@mui/material/styles'
import Stack, { StackProps } from '@mui/material/Stack'
import { TabContext } from '@renderer/App'
import { tabArray } from '@components/Nav/Nav'
import { lazyImport } from '@utils/lazyImport'
//Dynamic Imports
const Todos = lazyImport('../panels/Todos/Todos.tsx', 'Todos')
const GoogleHome = lazyImport('../panels/GoogleHome/GoogleHome.tsx', 'GoogleHome')
const Sensors = lazyImport('../panels/Sensors/Sensors.tsx', 'Sensors')
const Stocks = lazyImport('../panels/Stocks/Stocks.tsx', 'Stocks')

interface PanelsProps extends StackProps {

}

const PanelBox = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.text.disabled}`,
  height: '100%',
  maxHeight: 'inherit',
  position: 'relative'
}))

const DottedLine = styled(Stack)(({theme}) => ({
  background: `linear-gradient(${theme.palette.text.disabled}, ${theme.palette.text.disabled}) no-repeat center/1px 100%`,
  width: 120,
  height: '80%',
  position: 'absolute',
  right: 0,
  top: "10%"
}))

export const Panels = ({...props}: PanelsProps) => {
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
    <PanelBox 
    {...props}
    >
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
      <DottedLine
        onMouseDown={handleMouseDown} 
        onMouseMove={handleMouseMove} 
        onMouseUp={handleMouseUp}
      />
    </PanelBox>
  )
}
