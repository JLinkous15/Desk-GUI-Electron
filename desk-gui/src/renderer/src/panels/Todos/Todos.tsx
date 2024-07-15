import { styled, Typography } from '@mui/material'
import { EditTodosButton } from './EditTodosButton'
import { EditTodosDialog } from './EditTodosDialog'
import { useEffect, useState } from 'react'
import { AbsoluteTopRight } from '@components/Common/AbsoluteTopRight'
import { loadNotes } from '../../store'
import { NoteInfo } from '@shared/models'

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
  const [notes, setNotes] = useState<NoteInfo[]>([])

  const handleDialogClick = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  useEffect(() => {
    loadNotes().then(res => {
      setNotes(res)
    })
  }, [])

  return (
    <>
      <StyledTodosDiv>
        <AbsoluteTopRight>
          <EditTodosButton onClick={handleDialogClick} />
        </AbsoluteTopRight>
        <Typography variant="body1">{notes[0]?.title}</Typography>
        <Typography variant="body1">{Date(Math.floor(notes[0]?.lastEditTime)).toLocaleString()}</Typography>
      </StyledTodosDiv>
      <EditTodosDialog open={dialogOpen} onClose={handleDialogClose} />
    </>
  )
}
