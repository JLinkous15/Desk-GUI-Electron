import { styled, useTheme } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import OtherHousesIcon from '@mui/icons-material/OtherHouses'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import SettingsIcon from '@mui/icons-material/Settings'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { useContext, useState } from 'react'
import { ColorModeSwitch } from '../Common/ColorModeSwitch'
import { NavSettingsDialog } from './NavSettingsDialog'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import { Monitor } from '@mui/icons-material'
import { TabContext } from '@renderer/App'

const NavBar = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    height: '100%',
    border: `1px solid ${theme.palette.primary.main}`,
    background: `linear-gradient(195deg, ${theme.palette.primary.main + '90'}, ${theme.palette.primary.main + '30'})`,
    boxShadow: `16px 16px 16px ${theme.palette.shadow}`,
    '*': {
      color: '#ffffff'
    }
  }
})

export const tabArray = [
  {
    name: 'ToDos',
    icon: <FormatListBulletedIcon fontSize="large" />
  },
  {
    name: 'Google Home',
    icon: <OtherHousesIcon fontSize="large" />
  },
  {
    name: 'Sensor Panel',
    icon: <EqualizerIcon fontSize="large" />
  },
  {
    name: 'Stocks',
    icon: <TrendingUpIcon fontSize="large" />
  }
]

export const Nav = () => {
  const theme = useTheme()
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const { tab, setTab } = useContext(TabContext)
  const menuOpen = Boolean(anchorEl)

  const handleTabChange = (e: React.SyntheticEvent<Element, Event>, newValue: number) => {
    e.preventDefault()
    setTab(newValue)
  }

  const handleSettingsDialogClose = () => {
    setSettingsOpen(false)
  }

  const handleSettingsClick = (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
    if (!e) return
    setSettingsOpen(true)
    setAnchorEl(null)
  }

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
    if (!e) return
    setAnchorEl(e.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const indicatorStyle = {
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.text.disabled}`,
    borderLeft: '7px solid white',
    boxShadow: `0 0 5px ${theme.palette.text.disabled}, inset 0 0 5px ${theme.palette.text.disabled}`,
    left: 0,
    width: '100%'
  }

  return (
    <NavBar>
      <Tabs
        orientation="vertical"
        value={tab}
        onChange={handleTabChange}
        selectionFollowsFocus
        TabIndicatorProps={{ style: indicatorStyle }}
        sx={{ height: '100%' }}
      >
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
      <IconButton onClick={handleMenuClick} style={{ alignSelf: 'center', margin: '1rem' }}>
        <SettingsIcon fontSize="large" />
      </IconButton>
      <Menu open={menuOpen} anchorEl={anchorEl} onClose={handleMenuClose}>
        <MenuItem>
          <ColorModeSwitch />
        </MenuItem>
        <MenuItem>
          <IconButton onClick={handleSettingsClick} sx={{ width: '100%', alignSelf: 'center' }}>
            <Monitor />
          </IconButton>
        </MenuItem>
      </Menu>
      <NavSettingsDialog open={settingsOpen} onClose={handleSettingsDialogClose} />
    </NavBar>
  )
}
