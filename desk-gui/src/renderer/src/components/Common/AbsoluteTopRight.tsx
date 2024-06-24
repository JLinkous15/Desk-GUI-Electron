import Stack, { StackProps } from '@mui/material/Stack'
import React from 'react'

interface AbsoluteTopRightProps extends StackProps {
  children: React.ReactNode
}

export const AbsoluteTopRight = ({ children, ...props }: AbsoluteTopRightProps) => {
  return (
    <Stack
      direction="row"
      position={'absolute'}
      right={30}
      top={30}
      gap={'30px'}
      margin={0}
      padding={0}
      {...props}
    >
      {children}
    </Stack>
  )
}
