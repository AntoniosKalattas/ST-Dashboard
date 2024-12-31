const { app, BrowserWindow } = require('electron/main');
const path = require('node:path');
const { spawn } = require('child_process'); 

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    //icon: path.join(__dirname, 'assets', 'app-icon.png'), 
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false
      }
  });

  win.loadFile('./web/index.html');
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})