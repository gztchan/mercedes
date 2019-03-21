const { BrowserWindow } = require('electron')

export default function createLauncher() {
  // Create the browser window.
  const launcher = new BrowserWindow({
    frame: false,
    resizable: false,
    center: true,
    width: 800,
    height: 160
  });

  // and load the index.html of the app.
  launcher.loadFile('./entries/launcher.html')

  // Open the DevTools.
  launcher.webContents.openDevTools()

  // Emitted when the window is closed.
  launcher.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  return launcher;
}
