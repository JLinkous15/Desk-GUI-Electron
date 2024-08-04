import { styled, useTheme } from '@mui/material/styles'
import { Nav } from '@components/Nav/Nav'
import { Time } from '@components/Time/Time'
import React, { useState, createContext } from 'react'
import { Widgets } from '@components/Widgets/Widgets'
import { Panels } from '@panels/Panels'
import SvgIcon from '@mui/material/SvgIcon'
import Logo from './assets/Logo.svg?react'

type TabContextType = {
  tab: number
  setTab: React.Dispatch<React.SetStateAction<number>>
}

const padding = 30

const DOMDiv = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 30,
  height: '100dvh',
  width: '100%',
  padding: padding,
  overflow: 'hidden',
  position: 'relative'
})

const PanelWindow = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: padding,
  height: '100%',
  width: '100%'
})

export const TabContext = createContext<TabContextType>({
  tab: 0,
  setTab: () => {}
})

export const App = () => {
  const [tab, setTab] = useState<number>(0)
  const theme = useTheme()

  const tabValue = {
    tab,
    setTab
  }

  return (
    <TabContext.Provider value={tabValue}>
      <DOMDiv>
        <Nav />
        <PanelWindow>
          <Widgets flex={1} />
          <Panels flex={5} />
        </PanelWindow>
        <Time />
        <SvgIcon
          component={Logo}
          inheritViewBox
          sx={{
            position: 'absolute',
            fontSize: `675px`,
            bottom: '-5%',
            left: '-3%',
            color: `${theme.palette.text.primary}07`,
            pointerEvents: 'none'
          }}
        />
      </DOMDiv>
    </TabContext.Provider>
  )
}
