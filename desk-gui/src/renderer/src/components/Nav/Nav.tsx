import { styled, useTheme } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import WidgetsIcon from '@mui/icons-material/Widgets'
import OtherHousesIcon from '@mui/icons-material/OtherHouses'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import SettingsIcon from '@mui/icons-material/Settings'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { useContext, useState } from 'react'
import { TabContext } from '@renderer/App'
import { ColorModeSwitch } from '../Common/ColorModeSwitch'
import { NavSettingsDialog } from './NavSettingsDialog'

const NavBar = styled('div')(({ theme }) => {
  return {
    margin: '1rem',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    left: 0,
    height: `calc(100% - 2rem)`,
    border: `1px solid ${theme.palette.primary.main}`,
    background: `linear-gradient(195deg, ${theme.palette.primary.main + '90'}, ${theme.palette.primary.main + '30'})`,
    boxShadow: `16px 16px 16px ${theme.palette.shadow}`,
    '*': {
      color: '#ffffff'
    }
  }
})

const tabArray = [
  {
    name: "Widgets",
    icon: <WidgetsIcon fontSize="large" />,
  },
  {
    name: "ToDos",
    icon: <FormatListBulletedIcon fontSize="large" />,
  },
  {
    name: "Google Home",
    icon: <OtherHousesIcon fontSize="large" />,
  },
  {
    name: "Sensor Panel",
    icon: <EqualizerIcon fontSize="large" />,
  },
  {
    name: "Stocks",
    icon: <TrendingUpIcon fontSize="large" />,
  },
  {
    name: "Settings",
    icon: <SettingsIcon fontSize="large" />,
  },
]

export const Nav = () => {
  const theme = useTheme()
  const [open, setOpen] = useState<boolean>(false)
  const { tab, setTab } = useContext(TabContext)

  const handleTabChange = (e: React.SyntheticEvent<Element, Event>, newValue: number) => {
    e.preventDefault()
    setTab(newValue)
    newValue === tabArray.length - 1 && setOpen(true)
  }

  const handleSettingsDialogClose = () => {
    setOpen(false)
  }

  const indicatorStyle = {
    backgroundColor: "transparent",
    border: `1px solid ${theme.palette.text.disabled}`,
    borderLeft: '7px solid white',
    boxShadow: `0 0 5px ${theme.palette.text.disabled}, inset 0 0 5px ${theme.palette.text.disabled}`,
    left: 0,
    width: '100%',
  }

  return (
    <NavBar>
      <Tabs
        orientation="vertical"
        value={tab}
        onChange={handleTabChange}
        selectionFollowsFocus
        TabIndicatorProps={{ style: indicatorStyle }}
        sx={{height: '100%'}}>
          {tabArray.map((tabListItem, index) => (
            <Tab 
            value={index} 
            key={index} 
            icon={tabListItem.icon}
            sx={{
              backgroundColor: tab === index ? theme.palette.primary.main : undefined,
              paddingY: 2.5,
              '&:hover': {
                backgroundColor: theme.palette.primary.main
              }
            }} 
             />
          ))}
      </Tabs>
      <ColorModeSwitch style={{alignSelf: "center", margin: '1rem'}} />
      <NavSettingsDialog open={open} onClose={handleSettingsDialogClose} />
    </NavBar>
  )
}
