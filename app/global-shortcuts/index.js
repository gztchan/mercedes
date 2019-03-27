const { globalShortcut } = require('electron')

const ActivateLauncher = require('./activate-launcher');

module.exports = async function () {
  // globalShortcut.register(await ActivateLauncher.shortcut(), ActivateLauncher.handler());
}
