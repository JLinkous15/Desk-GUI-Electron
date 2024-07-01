import { styled } from '@mui/material'
import { EditTodosButton } from './EditTodosButton'
import { EditTodosDialog } from './EditTodosDialog'
import { useState } from 'react'
import { AbsoluteTopRight } from '@components/Common/AbsoluteTopRight'

const StyledTodosDiv = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '30px'
})

export const Todos = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const handleDialogClick = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  return (
    <>
      <StyledTodosDiv>
        <AbsoluteTopRight>
          <EditTodosButton onClick={handleDialogClick} />
        </AbsoluteTopRight>
      </StyledTodosDiv>
      <EditTodosDialog open={dialogOpen} onClose={handleDialogClose} />
    </>
  )
}
