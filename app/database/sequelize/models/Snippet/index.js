const Sequelize = require('sequelize');
const Snippet = require('./snippet.js');

module.exports = {
  modelClass: Snippet,
  init: function (sequelize) {
    Snippet.init({
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
