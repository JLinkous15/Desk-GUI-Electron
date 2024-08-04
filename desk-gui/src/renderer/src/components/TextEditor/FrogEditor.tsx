import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FrogEditorMenu } from './FrogEditorMenu'
import { FrogBubbleMenu } from './FrogBubbleMenu'
import { FrogFloatMenu } from './FrogFloatMenu'

const extensions = [StarterKit]

// const content = '<p>Hello World!</p>'

export const FrogEditor = ({ content }) => {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      // slotBefore={<FrogEditorMenu />}
    >
      <FrogBubbleMenu />
      <FrogFloatMenu />
    </EditorProvider>
  )
}
