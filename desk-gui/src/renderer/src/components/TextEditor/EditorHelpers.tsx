import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import { CSSProperties } from 'react'

type EditorExtensionType = {
  [key: string] : {
    displayName: string | JSX.Element
    style: Partial<CSSProperties>
    disablable: boolean
    methods: {}[][]
  }
}

export const editorExtensions: EditorExtensionType = {
  bold: {
    displayName: "B",
    style: {
      fontWeight: "bold"
    },
    disablable: true,
    methods: [
      ["chain", {}], 
      ["focus", {}], 
      ["toggleBold", {}], 
      ["run", {}]
    ]
  },
  italic: {
    displayName: "I",
    style: {
      fontStyle: "italic"
    },
    disablable: true,
    methods: [
      ["chain", {}], 
      ["focus", {}], 
      ["toggleItalic", {}], 
      ["run", {}]
    ]
  },
  strike: {
    displayName: "STRIKE",
    style: {
      textDecoration: "line-through"
    },
    disablable: true,
    methods: [
      ["chain", {}], 
      ["focus", {}], 
      ["toggleStrike", {}], 
      ["run", {}]
    ]
  },
  h1: {
    displayName: "h1",
    style: {},
    disablable: false,
    methods: [
      ["chain", {}], 
      ["focus", {}], 
      ["toggleHeading", { level: 1 }], 
      ["run", {}]
    ]
  },
  h2: {
    displayName: "h2",
    style: {},
    disablable: false,
    methods: [
      ["chain", {}], 
      ["focus", {}], 
      ["toggleHeading", { level: 2 }], 
      ["run", {}]
    ]
  },
  h3: {
    displayName: "h3",
    style: {},
    disablable: false,
    methods: [
      ["chain", {}], 
      ["focus", {}], 
      ["toggleHeading", { level: 3 }], 
      ["run", {}]
    ]
  },
  p: {
    displayName: "p",
    style: {},
    disablable: false,
    methods: [
      ["chain", {}], 
      ["focus", {}], 
      ["setParagraph", {}], 
      ["run", {}]
    ]
  },
  bulletedList: {
    displayName: <FormatListBulletedIcon />,
    style: {},
    disablable: false,
    methods: [
      ["chain", {}], 
      ["focus", {}], 
      ["toggleBulletList", {}], 
      ["run", {}]
    ]
  },
  blockquote: {
    displayName: <FormatQuoteIcon />,
    style: {},
    disablable: false,
    methods: [
      ["chain", {}], 
      ["focus", {}], 
      ["setParagraph", {}], 
      ["run", {}]
    ]
  },
  code: {
    displayName: "</>",
    style: {},
    disablable: true,
    methods: [
      ["chain", {}], 
      ["focus", {}], 
      ["toggleCode", {}], 
      ["run", {}]
    ]
  },
  codeBlock: {
    displayName: "[</>]",
    style: {},
    disablable: true,
    methods: [
      ["chain", {}], 
      ["focus", {}], 
      ["toggleCodeBlock", {}], 
      ["run", {}]
    ]
  },
  horizontal: {
    displayName: <HorizontalRuleIcon />,
    style: {},
    disablable: true,
    methods: [
      ["chain", {}], 
      ["focus", {}], 
      ["setHorizontalRule", {}], 
      ["run", {}]
    ]
  },
  clear: {
    displayName: <RestartAltIcon />,
    style: {},
    disablable: false,
    methods: [
      ["chain", {}], 
      ["focus", {}], 
      ["unsetAllMarks", {}], 
      ["clearNodes", {}], 
      ["run", {}]
    ]
  },
}