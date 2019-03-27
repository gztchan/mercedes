const path = require('path')
const { app, BrowserWindow } = require('electron')

module.exports = function() {
  const command = !this.launcher.isVisible() ? 'show' : 'hide';
  this.launcher[command]();
}
