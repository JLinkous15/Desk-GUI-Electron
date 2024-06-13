import React from 'react'
import ReactDOM from 'react-dom/client'
import { DeskControl } from './DeskControl'
import { JLThemeProvider } from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <JLThemeProvider>
      <DeskControl />
    </JLThemeProvider>
  </React.StrictMode>
)
