import { CommonComponentTypes } from '@/components/Common/commonComponentTypes'
import { StyledDialog } from '@components/Common/GlassDialog'
import { GlassDialogContent } from '@components/Common/GlassDialogContent'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import { DialogProps } from '@mui/material/Dialog'
import { useState } from 'react'
import { MarkdownEditor } from '../../components/Common/MarkdownEditor'

interface EditTodosDialogProps extends DialogProps {}

export const EditTodosDialog = ({ ...props }: EditTodosDialogProps) => {
  const [markdown, setMarkdown] = useState<string>('')

  const onMarkdownChange = (newMarkdown: string) => {
    setMarkdown(newMarkdown)
  }

  const absoluteButtons: CommonComponentTypes.GlassDialogTypes.GlassDialogButton[] = [
    {
      title: 'Add',
      onClick: () => {
        console.log('Add')
      },
      icon: AddIcon
    },
    {
      title: 'Delete',
      onClick: () => {
        console.log('Delete')
      },
      icon: DeleteIcon
    },
    {
      title: 'Close',
      //@ts-ignore weird use of props
      onClick: props.onClose,
      icon: CloseIcon
    }
  ]
  return (
    <StyledDialog {...props} fullScreen>
      <GlassDialogContent tabs={[{ title: 'Hello' }]} buttons={absoluteButtons}>
        <MarkdownEditor markdown={markdown} onChange={onMarkdownChange} />
      </GlassDialogContent>
    </StyledDialog>
  )
}
