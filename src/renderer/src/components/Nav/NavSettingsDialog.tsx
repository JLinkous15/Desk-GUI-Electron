import Dialog, { DialogProps } from '@mui/material/Dialog'
import { useEffect, useState } from 'react'
import MonitorIcon from '@mui/icons-material/Monitor'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

const handleWindowGetter = async () => {
  //@ts-ignore
  const isExtended = await window.screen.isExtended

  if (!isExtended) return

  //@ts-ignore
  const details = await window.getScreenDetails()
  return details
}

export const NavSettingsDialog = ({ ...props }: DialogProps) => {
  const theme = useTheme()
  const [monitors, setMonitors] = useState<Screen[]>([])

  useEffect(() => {
    handleWindowGetter().then((res) => setMonitors(res.screens))
  }, [])

  const handleScreenClick = (index: number) => {
    const monitor = monitors[index]
    //@ts-ignore
    window.resizeTo(monitor.width, monitor.height)
    //@ts-ignore
    window.moveTo(monitor.left, monitor.top)
  }

  return (
    <Dialog {...props} fullScreen sx={{ margin: '5%' }}>
      <Stack direction={'row'} position={'relative'}>
        {monitors.map((monitor, index) => {
          return (
            <Button key={index} onClick={() => handleScreenClick(index)}>
              <SvgIcon
                component={MonitorIcon}
                sx={{ fontSize: '300px', color: theme.palette.text.primary }}
              />
              <Typography
                position={'absolute'}
                color={theme.palette.text.primary}
              >{`${monitor.width} x ${monitor.height}`}</Typography>
            </Button>
          )
        })}
      </Stack>
    </Dialog>
  )
}
