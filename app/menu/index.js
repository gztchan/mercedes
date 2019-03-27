const { app, Menu, ipcMain } = require('electron')

module.exports = function (main) {
  const template = [
    {
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Dashboard',
      submenu: [
        {
          label: 'Show',
          click: () => {
            main.dashboard.show();
          }
        },
        {
          label: 'Hide',
          click: () => {
            main.dashboard.hide();
          }
        },
      ]
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu);
}
