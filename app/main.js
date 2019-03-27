const path = require('path');
const { app } = require('electron')

require('electron-reload')(path.resolve(__dirname, '../'));

const Bridge = require('../app/database/bridge');

const { registerControllers } = require('../app/controller');

const globalShortcuts = require('./global-shortcuts');

const createDashboard = require('./windows/create-dashboard');
const createLauncher = require('./windows/create-launcher');

const menu = require('./menu');

this.launcher = null
this.dashboard = null
this.bridge = null

app.setName('Mercedes');

app.on('ready', async () => {

  this.bridge = await Bridge.connect();

  menu(this);

  registerControllers();

  globalShortcuts();

  this.dashboard = createDashboard(this);
  this.launcher = createLauncher();

  // app.dock.hide();
  // this.launcher.hide();
  this.dashboard.hide();
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// app.on('activate', () => {
//   // On macOS it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (this.launcher === null) {
//     this.launcher = createLauncher()
//   }class Klass() {}
// })
