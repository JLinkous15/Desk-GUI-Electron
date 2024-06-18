import { styled } from '@mui/material'
import { Nav } from './components/Nav'
import { Time } from './components/Time/Time'
import React, { useState } from 'react'
import { createContext } from 'react'

type TabContextType = {
  tab: number
  setTab: React.Dispatch<React.SetStateAction<number>>
}

const DOMDiv = styled('div')({
  height: '100%',
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
        <Time />
      </DOMDiv>
    </TabContext.Provider>
  )
}
