

const { BrowserWindow } = require('electron')

module.exports = function createDashboard(main) {
  // Create the browser window.
  // const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;

  const dashboard = new BrowserWindow({
    // frame: false,
    // movable: false,
    // resizable: false,
    // minimizable: false,
    // maximizable: false,
    title: 'Dashboard',
    center: true,
    width: 1200,
    height: 900,
  });

  // and load the index.html of the app.
  dashboard.loadFile('entries/dashboard.html');

  // Open the DevTools.
  dashboard.webContents.openDevTools()

  // dashboard.on('show', onShow);
  // dashboard.on('blur', onBlur.bind(this));

  dashboard.on('close', (event) => {
    event.preventDefault();
    main.dashboard.hide(function () {
    });
  });

  return dashboard;
}
