import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { FloatingMenu, useCurrentEditor } from '@tiptap/react'
import { MenuDiv } from '../Common/MenuDiv'
import { editorExtensions, executeMethods } from './EditorHelpers'
import { useTheme } from '@mui/material/styles'

export const FrogFloatMenu = () => {
  const { editor } = useCurrentEditor()
  const theme = useTheme()

  if (!editor) return

  return (
    <FloatingMenu editor={editor}>
      <MenuDiv>
        {Object.entries(editorExtensions).map(([k, v], index) => {
          if (v.isFloat)
            return (
              <Button
                key={index}
                onClick={() => executeMethods(v, editor)}
                disabled={v.disablable && !executeMethods(v, editor.can())}
                sx={{
                  backgroundColor: editor.isActive(k.toString())
                    ? theme.palette.primary.main
                    : null,
                  color: editor.isActive(k.toString()) ? theme.palette.background.default : null
                }}
              >
                <Typography variant="body1">{v.displayName}</Typography>
              </Button>
            )
        })}
      </MenuDiv>
    </FloatingMenu>
  )
}
