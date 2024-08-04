import { useTheme } from '@mui/material/styles'
import Stack, { StackProps } from '@mui/material/Stack'
import React from 'react'

interface AbsoluteTopRightProps extends StackProps {
  children: React.ReactNode
}

export const AbsoluteTopRight = ({ children, ...props }: AbsoluteTopRightProps) => {
  const theme = useTheme()
  return (
    <Stack
      direction="row"
      position={'absolute'}
      right={0}
      top={0}
      margin={0}
      padding={"37px"}
      sx={{
        backgroundColor: theme.palette.background.default,
        zIndex: 100
      }}
      {...props}
    >
      {children}
    </Stack>
  )
}
