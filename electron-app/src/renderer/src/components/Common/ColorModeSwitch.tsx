import LightModeIcon from '@mui/icons-material/LightMode'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import { useTheme } from '@mui/material/styles'
import { useContext } from 'react'
import { ColorModeContext } from '../../theme'

export const ColorModeSwitch = () => {
  const { toggleColorMode } = useContext(ColorModeContext)
  const theme = useTheme()

  const handleSwitch = () => toggleColorMode()

  return (

        <Stack direction="row" alignItems="center" padding={2}>
          <LightModeIcon color="primary" />
          <Switch color="primary" checked={theme.palette.mode === 'dark'} onChange={handleSwitch} />
          <ModeNightIcon color="primary" />
        </Stack>
  )
}
