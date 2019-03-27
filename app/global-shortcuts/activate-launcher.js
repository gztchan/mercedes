const findOne = require('../database/nedb/find-one');

module.exports = {
  shortcut: async function () {
    const { innerDB } = this.database;
    const doc = await findOne(innerDB, { name: 'Mercedes' });
    return doc.mainShortcut;
  },
  handler() {
    this.launcher.active();
  }
}
