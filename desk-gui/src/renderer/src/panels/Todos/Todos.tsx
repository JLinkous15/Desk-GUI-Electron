import { styled } from '@mui/material/styles'
import { EditTodosButton } from '../../components/Common/EditTodosButton'
import { useEffect, useState } from 'react'
import { NoteInfo } from '@shared/models'
import { FrogEditor } from '../../components/TextEditor/FrogEditor'
import { JSONContent } from 'novel'

type NoteInfoWithContent = NoteInfo & {
  content?: string
}

const localStorageMarkdown = 'deskControlMarkdown'

const StyledTodosDiv = styled('div')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  maxHeight: 'inherit',
  justifyContent: 'space-between'
})

export const Todos = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [markdown, setMarkdown] = useState({
    type: "doc",
    content: ""
  })

  return (
      <StyledTodosDiv>
        <div style={{width: '100%', height: '100%', minHeight: 'inherit'}}>
          <FrogEditor content={markdown} />
        </div>
      </StyledTodosDiv>
  )
}
