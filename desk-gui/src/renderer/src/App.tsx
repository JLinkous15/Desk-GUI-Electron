import { styled } from '@mui/material/styles'
import { Nav } from '@components/Nav/Nav'
import { Time } from '@components/Time/Time'
import React, { useState, createContext } from 'react'
import { Widgets } from '@components/Widgets/Widgets'
import { Panels } from '@panels/Panels'
import SvgIcon from '@mui/material/SvgIcon'
import Icon from '@mui/material/Icon'
import {ReactComponent as Logo} from './assets/Logo.svg'

type TabContextType = {
  tab: number
  setTab: React.Dispatch<React.SetStateAction<number>>
}

const DOMDiv = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 30,
  height: '100dvh',
  width: '100%',
  padding: 30,
  overflow: 'hidden'
})

const PanelWindow = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 30,
  height: '100dvh',
  overflow: 'hidden',
  width: '100%'
})

export const TabContext = createContext<TabContextType>({
  tab: 0,
  setTab: () => {}
})

export const App = () => {
  const [tab, setTab] = useState<number>(0)

  const tabValue = {
    tab,
    setTab
  }

  return (
    <TabContext.Provider value={tabValue}>
      <DOMDiv>
        <Nav />
        <PanelWindow>
          <Widgets />
          <Panels />
        </PanelWindow>
        <Time />
      </DOMDiv>
      {/* <SvgIcon component={Logo} /> */}
    </TabContext.Provider>
  )
}
