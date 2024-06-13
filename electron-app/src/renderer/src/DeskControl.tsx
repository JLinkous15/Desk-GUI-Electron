import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Menu, MenuItem, SvgIconTypeMap, styled } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import React, { useState } from 'react'
import { useDisplay } from './Hooks/useDisplay'
import { Clock } from './components/Clock'
import { TactileIconButton } from './components/Common/TactileIconButton'
import { Timer } from './components/Timer/Timer'
import { ColorModeSwitch } from './components/Common/ColorModeSwitch'

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

export const DeskControl = () => {
  const { browser, isLandscape, appRef } = useDisplay()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
    if (e) setAnchorEl(e.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  console.log(isLandscape)

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
      {/* <Clock />
      <Timer /> */}
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
        <MenuItem>
          <ColorModeSwitch />
        </MenuItem>
      </Menu>
    </div>
  )
}
