import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import React from 'react'

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: `10px 10px 20px ${theme.palette.shadow},  -10px -10px 20px ${theme.palette.highlight}`,
  zIndex: 100,
  transition: '150ms ease-in-out',
  ' &:hover': {
    boxShadow: 'none',
    transition: '150ms ease-in-out'
  }
}))

interface TactileIconButtonProps extends IconButtonProps {
  children: React.ReactNode
}

export const TactileIconButton = ({ children, ...props }: TactileIconButtonProps) => {
  return (
    <StyledIconButton size="large" {...props}>
      {children}
    </StyledIconButton>
  )
}
