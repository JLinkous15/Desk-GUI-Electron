import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { DeskGuiThemeProvider } from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DeskGuiThemeProvider>
      <App />
    </DeskGuiThemeProvider>
  </React.StrictMode>
)
