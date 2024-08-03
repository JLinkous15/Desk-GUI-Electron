import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FrogEditorMenu } from './FrogEditorMenu'

const extensions = [StarterKit]

// const content = '<p>Hello World!</p>'

export const FrogEditor = ({content}) => {
  return (
    <EditorProvider 
      extensions={extensions} 
      content={content}
      slotBefore={<FrogEditorMenu />}
    >
      <FloatingMenu editor={null}>Float</FloatingMenu>
      <BubbleMenu editor={null}>Bubble</BubbleMenu>
    </EditorProvider>
  )
}