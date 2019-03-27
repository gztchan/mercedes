const path = require('path');
const { app, BrowserWindow } = require('electron')
const localShortcut = require('electron-localshortcut');

const onShow = require('./events/launcher/on-show');
const onBlur = require('./events/launcher/on-blur');



module.exports = function () {

  this.launcher = new BrowserWindow({
    nodeIntegration: false,
    frame: false,
    movable: false,
    resizable: false,
    minimizable: false,
    maximizable: false,
    center: true,
    width: 600,
    height: 100,
  });

  // and load the index.html of the app.

  const htmlPath = path.resolve('entries/launcher.html');
  this.launcher.loadFile(htmlPath);
  // Open the DevTools.
  this.launcher.webContents.openDevTools()

  this.launcher.on('show', onShow.bind(this));
  // launcher.on('blur', onBlur.bind(this));

  // localShortcut.register(this.launcher, 'Cmd+`', () => {
  //   this.launcher.webContents.send('LocalShortcut:WorkspaceChange');
  // });

  // for (let i = 0; i < 10; i += 1) {
  //   localShortcut.register(this.launcher, `Cmd+${i}`, () => {
  //     this.launcher.webContents.send('LocalShortcut:WorkspaceChange', i);
  //   });
  // }

  return this.launcher;
}
