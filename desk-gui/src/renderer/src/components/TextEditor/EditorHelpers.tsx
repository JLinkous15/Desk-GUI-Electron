import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import { CSSProperties } from 'react'

type EditorExtensionType = {
  [key: string]: {
    displayName: string | JSX.Element
    style: Partial<CSSProperties>
    disablable: boolean
    isBubble: boolean
    isFloat: boolean
    methods: {}[][]
  }
}

export const editorExtensions: EditorExtensionType = {
  bold: {
    displayName: 'B',
    style: {
      fontWeight: 'bold'
    },
    disablable: true,
    methods: [
      ['chain', {}],
      ['focus', {}],
      ['toggleBold', {}],
      ['run', {}]
    ],
    isBubble: true,
    isFloat: false
  },
  italic: {
    displayName: 'I',
    style: {
      fontStyle: 'italic'
    },
    disablable: true,
    methods: [
      ['chain', {}],
      ['focus', {}],
      ['toggleItalic', {}],
      ['run', {}]
    ],
    isBubble: true,
    isFloat: false
  },
  strike: {
    displayName: 'STRIKE',
    style: {
      textDecoration: 'line-through'
    },
    disablable: true,
    methods: [
      ['chain', {}],
      ['focus', {}],
      ['toggleStrike', {}],
      ['run', {}]
    ],
    isBubble: true,
    isFloat: false
  },
  h1: {
    displayName: 'h1',
    style: {},
    disablable: false,
    methods: [
      ['chain', {}],
      ['focus', {}],
      ['toggleHeading', { level: 1 }],
      ['run', {}]
    ],
    isBubble: true,
    isFloat: true
  },
  h2: {
    displayName: 'h2',
    style: {},
    disablable: false,
    methods: [
      ['chain', {}],
      ['focus', {}],
      ['toggleHeading', { level: 2 }],
      ['run', {}]
    ],
    isBubble: true,
    isFloat: true
  },
  h3: {
    displayName: 'h3',
    style: {},
    disablable: false,
    methods: [
      ['chain', {}],
      ['focus', {}],
      ['toggleHeading', { level: 3 }],
      ['run', {}]
    ],
    isBubble: true,
    isFloat: true
  },
  p: {
    displayName: 'p',
    style: {},
    disablable: false,
    methods: [
      ['chain', {}],
      ['focus', {}],
      ['setParagraph', {}],
      ['run', {}]
    ],
    isBubble: true,
    isFloat: true
  },
  bulletList: {
    displayName: <FormatListBulletedIcon />,
    style: {},
    disablable: false,
    methods: [
      ['chain', {}],
      ['focus', {}],
      ['toggleBulletList', {}],
      ['run', {}]
    ],
    isBubble: true,
    isFloat: true
  },
  blockquote: {
    displayName: <FormatQuoteIcon />,
    style: {},
    disablable: false,
    methods: [
      ['chain', {}],
      ['focus', {}],
      ['setParagraph', {}],
      ['run', {}]
    ],
    isBubble: true,
    isFloat: true
  },
  code: {
    displayName: '</>',
    style: {},
    disablable: true,
    methods: [
      ['chain', {}],
      ['focus', {}],
      ['toggleCode', {}],
      ['run', {}]
    ],
    isBubble: true,
    isFloat: true
  },
  codeBlock: {
    displayName: '[</>]',
    style: {},
    disablable: true,
    methods: [
      ['chain', {}],
      ['focus', {}],
      ['toggleCodeBlock', {}],
      ['run', {}]
    ],
    isBubble: true,
    isFloat: true
  },
  horizontal: {
    displayName: <HorizontalRuleIcon />,
    style: {},
    disablable: true,
    methods: [
      ['chain', {}],
      ['focus', {}],
      ['setHorizontalRule', {}],
      ['run', {}]
    ],
    isBubble: false,
    isFloat: true
  },
  clear: {
    displayName: <RestartAltIcon />,
    style: {},
    disablable: false,
    methods: [
      ['chain', {}],
      ['focus', {}],
      ['unsetAllMarks', {}],
      ['clearNodes', {}],
      ['run', {}]
    ],
    isBubble: true,
    isFloat: false
  }
}

export const executeMethods = (v, accumulator) => {
  return v.methods.reduce((acc, [method, args]) => {
    if (Object.keys(args).length) {
      return acc[method](args)
    }
    return acc[method]()
  }, accumulator)
}
