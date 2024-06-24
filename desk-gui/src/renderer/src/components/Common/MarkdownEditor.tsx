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
      // iconComponentFor={}
      {...props}
    />
  )
}
