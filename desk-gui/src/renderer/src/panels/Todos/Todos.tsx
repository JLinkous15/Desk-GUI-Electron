import { styled, Typography } from '@mui/material'
import { EditTodosButton } from '../../components/Common/EditTodosButton'
import { EditTodosDialog } from './EditTodosDialog'
import { useEffect, useState } from 'react'
import { AbsoluteTopRight } from '@components/Common/AbsoluteTopRight'
import { loadNotes, readNote } from '../../store'
import { NoteInfo } from '@shared/models'

type NoteInfoWithContent = NoteInfo & {
  content?: string
}

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
  const [notes, setNotes] = useState<NoteInfoWithContent[]>([])
  const [frog, setFrog] = useState<number>(0)

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
    Promise.all(notes.map((note, index) => (
      readNote(note.title)
      .then((res) => {
        setNotes(prev => [...prev, prev[index].content = res])
      })
    )))
  }, [])

  return (
    <>
      <StyledTodosDiv>
        <Typography variant="body1">{notes[frog]?.title || 'No Notes...'}</Typography>
        <Typography variant="body1">{notes[frog]?.lastEditTime || 'No Date...'}</Typography>
        <Typography variant="body1">{notes[frog]?.content || 'No content..'}</Typography>

        <AbsoluteTopRight>
          <EditTodosButton onClick={handleDialogClick} />
        </AbsoluteTopRight>
      </StyledTodosDiv>
      <EditTodosDialog open={dialogOpen} onClose={handleDialogClose} />
    </>
  )
}
