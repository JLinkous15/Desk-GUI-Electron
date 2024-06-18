import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import WidgetsIcon from '@mui/icons-material/Widgets'
import OtherHousesIcon from '@mui/icons-material/OtherHouses'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import SettingsIcon from '@mui/icons-material/Settings'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import { useContext, useState } from 'react'
import { TabContext } from '@renderer/App'
import { ColorModeSwitch } from './Common/ColorModeSwitch'
import { Menu, MenuItem } from '@mui/material'

const NavBar = styled(Box)(({ theme }) => {
  return {
    margin: '1rem',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    left: 0,
    height: `calc(100% - 2rem)`,
    border: `1px solid ${theme.palette.primary.main}`,
    background: `linear-gradient(195deg, ${theme.palette.primary.main}, ${theme.palette.primary.main + '40'})`,
    '*': {
      color: '#ffffff'
    }
  }
})

export const Nav = () => {
  const { tab, setTab } = useContext(TabContext)

  const handleTabChange = (e: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setTab(newValue)
  }

  return (
    <NavBar>
      <Tabs
        orientation="vertical"
        value={tab}
        onChange={handleTabChange}
        TabIndicatorProps={{
          style: {
            backgroundColor: 'white',
            left: 0,
            width: '7%'
          }
        }}
      >
        <Tab value={0} icon={<WidgetsIcon fontSize="large" />} />
        <Tab value={1} icon={<OtherHousesIcon fontSize="large" />} />
        <Tab value={2} icon={<EqualizerIcon fontSize="large" />} />
        <Tab value={3} icon={<SettingsIcon fontSize="large" />} />
      </Tabs>
        <ColorModeSwitch />
    </NavBar>
  )
}
