import { useCurrentEditor } from '@tiptap/react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import styled from '@emotion/styled'
import { editorExtensions, executeMethods } from './EditorHelpers'

const StyledTextEditorButton = styled(Button)({
  borderRadius: 0,
  padding: '15px 20px'
})

export const FrogEditorMenu = () => {
  const { editor } = useCurrentEditor()

  if (!editor) return

  return (
    <Stack direction="row">
      {Object.values(editorExtensions).map((v, index) => {
        return (
          <StyledTextEditorButton
            key={index}
            size="large"
            onClick={() => executeMethods(v, editor)}
            disabled={v.disablable && !executeMethods(v, editor.can())}
            sx={v.style}
          >
            {v.displayName}
          </StyledTextEditorButton>
        )
      })}
    </Stack>
  )
}
