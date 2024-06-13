import { Button, Menu, SpeedDial, SvgIconTypeMap, styled } from '@mui/material'
import { useDisplay } from './Hooks/useDisplay'
import { Clock } from './components/Clock'
import { Timer } from './components/Timer/Timer'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import React, { useState } from 'react'
import { TactileIconButton } from './components/Common/TactileIconButton'

interface SpeedDialIconType extends OverridableComponent<SvgIconTypeMap<{}, 'svg'>> {
  open: boolean
}

const NavIcon = styled(AddCircleOutlineIcon, {
  shouldForwardProp: (prop) => prop !== 'open'
})<SpeedDialIconType>(({ theme, open }) => ({
  transform: 'rotate(0deg)',
  transition: theme.transitions.create('transform', {}),
  ...(open && {
    transform: 'rotate(1095)'
  })
}))

export const App = () => {
  const { browser, isLandscape, appRef } = useDisplay()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
    if (e) setAnchorEl(e.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <div
      style={{
        width: browser.width,
        height: browser.height,
        position: 'relative',
        overflow: 'hidden'
      }}
      ref={appRef}
    >
      <Clock />
      <Timer />
      <TactileIconButton
        sx={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          ...(!isLandscape && {
            left: 0
          })
        }}
        aria-lebel={'nav-actions'}
        onClick={handleMenuClick}
      >
        <AddCircleOutlineIcon />
      </TactileIconButton>
      <Menu open={open} aria-expanded={open ? 'true' : undefined} onClose={handleMenuClose}>
        hello
      </Menu>
    </div>
  )
}
