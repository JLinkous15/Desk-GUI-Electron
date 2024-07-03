import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme'
import { PaletteMode, alpha } from '@mui/material'
import { createContext, useEffect, useMemo, useState } from 'react'

export const themeConstants = {
  navbarSize: 60,
  navbarAdd: 150,
  mdxClassname: "bananas",
  scrollWidth: 35,
}

//palette options
const hexPalette = {
  primary: {
    light: '#3F6A84',
    dark: '#2C6684'
  },
  secondary: {
    light: '#c74836',
    dark: '#E4523E'
  },
  highlight: {
    light: '#EFEFEF',
    dark: '#292929'
  },
  shadow: {
    light: '#D0D0D0',
    dark: '#161616'
  },
  background: {
    light: {
      default: '#DDDDDD',
      paper: '#DDDDDD'
    },
    dark: {
      default: '#1d1d1d',
      paper: '#1d1d1d'
    }
  },
  text: {
    light: {
      primary: '#000000',
      secondary: '#ffffff',
      disabled: '#00000050'
    },
    dark: {
      primary: '#ffffff',
      secondary: '#000000',
      disabled: '#ffffff50'
    }
  }
}

//sets the color mode on the palette object and conditionally chooses the palette
const getTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: hexPalette.primary.light
          },
          secondary: {
            main: hexPalette.secondary.light
          },
          highlight: hexPalette.highlight.light,
          shadow: hexPalette.shadow.light,
          background: hexPalette.background.light,
          text: hexPalette.text.light
        }
      : {
          // palette values for light mode
          primary: {
            main: hexPalette.primary.dark
          },
          secondary: {
            main: hexPalette.secondary.dark
          },
          highlight: hexPalette.highlight.dark,
          shadow: hexPalette.shadow.dark,
          background: hexPalette.background.dark,
          text: hexPalette.text.dark
        })
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor:  mode === 'light' ? hexPalette.background.light : hexPalette.background.dark,
            width: themeConstants.scrollWidth,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: themeConstants.scrollWidth * 0.5,
            backgroundColor: mode === 'light' ? alpha(hexPalette.text.light.primary, 0.12) : alpha(hexPalette.text.dark.primary, 0.12),
            minHeight: themeConstants.scrollWidth * 0.5,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: mode === 'light' ? alpha(hexPalette.text.light.primary, 0.21) : alpha(hexPalette.text.dark.primary, 0.21),
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: mode === 'light' ? alpha(hexPalette.text.light.primary, 0.21) : alpha(hexPalette.text.dark.primary, 0.21),
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: mode === 'light' ? alpha(hexPalette.text.light.primary, 0.21) : alpha(hexPalette.text.dark.primary, 0.21),
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: mode === 'light' ? alpha(hexPalette.text.light.primary, 0.21) : alpha(hexPalette.text.dark.primary, 0.21),
          },
        },
        ['.' + themeConstants.mdxClassname + "[role='textbox']"]: {
          border:`1px solid ${ mode === 'light' ? alpha(hexPalette.text.light.primary, 0.12) : alpha(hexPalette.text.dark.primary, 0.12)}`,
          padding: '30px',
          height: `calc(100vh * 0.75)`,
          overflowY: 'auto',
          overflowX: 'wrap',
          borderRadius: 10,
          // '&[style=user-select: text]': {
          //   border: `1px solid ${ mode === 'light' ? hexPalette.primary.light : hexPalette.primary.dark }`
          // },
          '&:focus': {
            border: `1px solid ${ mode === 'light' ? hexPalette.primary.light : hexPalette.primary.dark }`
          },
          '&:active': {
            border: `1px solid ${ mode === 'light' ? hexPalette.primary.light : hexPalette.primary.dark }`
          },
          '& a': {
            color:  mode === 'light' ? hexPalette.primary.light : hexPalette.primary.dark
          }
        },
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        transform: 'scale(2)'
      }
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor:
            mode === 'light'
              ? hexPalette.background.light.default
              : hexPalette.background.dark.default,
          boxShadow: 'none',
          borderBottom: `1px solid ${mode === 'light' ? alpha(hexPalette.text.light.primary, 0.12) : alpha(hexPalette.text.dark.primary, 0.12)}`
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        focusRipple: true
      }
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'tactile' },
          style: {
            boxShadow: `5px 5px 10px ${mode === 'light' ? hexPalette.shadow.light : hexPalette.shadow.dark},  -5px -5px 10px ${mode === 'light' ? hexPalette.highlight.light : hexPalette.highlight.dark}`,
            transition: '150ms ease-in-out',
            ' &:hover': {
              backgroundColor: 'none',
              boxShadow: 'none',
              transition: '150ms ease-in-out'
            }
          }
        },
        {
          props: { variant: 'tactile', color: 'primary' },
          style: {
            color: mode === 'light' ? hexPalette.primary.light : hexPalette.primary.dark
          }
        },
        {
          props: { variant: 'tactile', color: 'secondary' },
          style: {
            color: mode === 'light' ? hexPalette.secondary.light : hexPalette.secondary.dark
          }
        }
      ]
    }
  },
  typography: {
    fontFamily: ['Montserrat', 'Space Mono', 'sans-serif'].join(','),
    h1: {
      fontSize: '72px',
      font: 'Montserrat',
      fontWeight: '200'
    },
    h2: {
      fontSize: '60px',
      font: 'Montserrat',
      fontWeight: '300'
    },
    body1: {
      font: 'Space Mono',
      fontSize: '28px'
    }
  }
})

type ThemeProvider = {
  children: React.ReactNode
}

type ColorModeContextType = {
  toggleColorMode: () => void
}

export const ColorModeContext = createContext<ColorModeContextType>({} as ColorModeContextType)

export const DeskGuiThemeProvider = ({ children }: ThemeProvider) => {
  const localStorageItem = 'JLColorMode'
  const [mode, setMode] = useState<PaletteMode>('dark')
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'))
        localStorage.setItem(localStorageItem, mode)
      }
    }),
    []
  )

  useEffect(() => {
    const userColorMode = localStorage.getItem(localStorageItem)
    if (userColorMode && userColorMode === ('light' || 'dark')) setMode(userColorMode)
    else localStorage.setItem(localStorageItem, mode)
  }, [])

  //@ts-ignore
  const theme = useMemo(() => createTheme(getTheme(mode)), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
