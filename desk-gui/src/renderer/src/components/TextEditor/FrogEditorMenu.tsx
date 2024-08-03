import { useCurrentEditor } from "@tiptap/react"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import styled from "@emotion/styled"
import { editorExtensions } from "./EditorHelpers"

const StyledTextEditorButton = styled(Button)({
  borderRadius: 0,
  padding: "15px 20px",
})

export const FrogEditorMenu = () => {
  const { editor } = useCurrentEditor()

  if (! editor) return

  const executeMethods = (v, accumulator) => {
    return v.methods.reduce((acc, [method, args]) => {
      if (Object.keys(args).length) {
        return acc[method](args)
      }
      return acc[method]()
    }, accumulator)
  }

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
          </StyledTextEditorButton>)
      })}
    </Stack>
  )
}