const Sequelize = require('sequelize');
const Workspace = require('./Workspace.js');

module.exports = {
  modelClass: Workspace,
  init: function (sequelize) {
    Workspace.init({
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
      },
      isDefault: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    }, {
      sequelize,
      // options
    });
  }
}
