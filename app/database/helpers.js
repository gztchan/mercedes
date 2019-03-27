const Workspace = require('./sequelize/models/Workspace');

exports.initData = async function (database) {
  return Workspace.findOrCreate({
    where: { isDefault: true },
    defaults: {
      name: 'Default',
      isDefault: true,
    },
  }).then(([workspace, created]) => {
    return findOne({ name: 'Mercedes' }).then(doc => {
      const slots = [];
      for (let i = 0; i < 11; i += 1) {
        slot.push({ ws: null });
      }

      return insert({
        name: 'Mercedes',
        dataPath: null,
        mainShortcut: 'Command+Shift+M',
        cws: workspace.id,
        slots,
      });
    });
  });
}
