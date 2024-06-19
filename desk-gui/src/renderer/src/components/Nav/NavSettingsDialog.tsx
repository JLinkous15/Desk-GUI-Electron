import { Dialog, DialogProps } from "@mui/material";

export const NavSettingsDialog = ({...props}: DialogProps) => {
  return (
    <Dialog {...props} fullScreen sx={{margin: '5%'}}>
      Select monitor, set resolution, fullscreen or not, etc.
    </Dialog>
  )
}

// main.js
// const {ipcMain} = require('electron')

// ipcMain.on('resize-window', (event, width, height) => {
//     let browserWindow = BrowserWindow.fromWebContents(event.sender)
//     browserWindow.setSize(width,height)
// })


// Renderer
// const {ipcRenderer} = require('electron');

// // ...
// ipcRenderer.send('resize-window', 1280, 720)


// async function openWindow(){
//   // Get screen info
//   const details = await getScreenDetails();
//   const secondScreen = details.screens[1];
//   const {left} = secondScreen;
  
//   // Open window
//   const winProps = `left=${left},top=100,width=640,height=480`;
//   const win = window.open(
//     "https://www.google.com/",
//     "My second screen window",
//     winProps
//   );
//   }
  
