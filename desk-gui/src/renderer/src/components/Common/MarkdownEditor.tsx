import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  linkPlugin,
  toolbarPlugin,
  imagePlugin,
  MDXEditor,
  MDXEditorProps,
  BoldItalicUnderlineToggles
} from '@mdxeditor/editor'
import { useTheme } from '@mui/material'
import { useEffect } from 'react'
import { themeConstants } from '@renderer/theme'

interface MarkdownEditorProps extends MDXEditorProps {
  markdown: string
}

const toolbarPluginWithProps = () =>
  toolbarPlugin({
    toolbarContents: () => (
      <>
        <BoldItalicUnderlineToggles />
      </>
    )
  })

export const MarkdownEditor = ({ markdown, ...props }: MarkdownEditorProps) => {

  return (
    <div style={{height: '100%'}}>

    <MDXEditor
      markdown={markdown}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        toolbarPluginWithProps(),
        imagePlugin()
      ]}
      contentEditableClassName={themeConstants.mdxClassname}
      // iconComponentFor={}
      {...props}
      />
      </div>
  )
}
