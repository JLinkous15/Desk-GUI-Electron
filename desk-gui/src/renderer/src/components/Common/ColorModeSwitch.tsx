import LightModeIcon from '@mui/icons-material/LightMode'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import { useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import { DetailedHTMLProps, HTMLAttributes, useContext, useState } from 'react'
import { ColorModeContext } from '../../theme'
import Brightness4Icon from '@mui/icons-material/Brightness4'

export const ColorModeSwitch = ({...props}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const { toggleColorMode } = useContext(ColorModeContext)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const theme = useTheme()

  const handleMenuOpen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e) setAnchorEl(e.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSwitch = () => toggleColorMode()

  return (
    <div {...props}>
      <IconButton onClick={handleMenuOpen}>
        <Brightness4Icon fontSize='large' />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <Stack direction="row" alignItems="center" padding={2}>
          <LightModeIcon  />
          <Switch
            
            checked={theme.palette.mode === 'dark'}
            onChange={handleSwitch}
          />
          <ModeNightIcon  />
        </Stack>
      </Menu>
    </div>
  )
}
