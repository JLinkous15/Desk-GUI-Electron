import { styled } from '@mui/material/styles'
import React from 'react'

type MenuDivProps = {
  children: React.ReactNode
  direction?: 'column' | 'row'
}

const StyledDiv = styled('div')({
  display: 'flex',
  // width: '1000px',
  gap: 30,
  padding: 30,
  borderRadius: '10px',
  backgroundColor: '#00000055',
  boxShadow: `inset -5px -5px 10px #00000015, inset 5px 5px 10px #ffffff15`,
  backdropFilter: 'blur( 8px )',
  borderRight: '1px solid #ffffff25',
  borderBottom: '1px solid #ffffff25'
})

export const MenuDiv = ({ children, direction }: MenuDivProps) => {
  return <StyledDiv style={{ flexDirection: direction }}>{children}</StyledDiv>
}
