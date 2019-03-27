module.exports = [
  {
    shortcut: 'Cmd+`',
    handler() {
      this.launcher.webContents.send('LocalShortcut:WorkspaceChange');
    },
  },
  {
    shortcut: 'Cmd+1',
    handler() {
      this.launcher.webContents.send('LocalShortcut:WorkspaceChange');
    },
  }
]
