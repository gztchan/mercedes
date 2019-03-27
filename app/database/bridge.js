const { app } = require('electron');
const Sequelize = require('sequelize');

const Snippet = require('./sequelize/models/Snippet');
const Workspace = require('./sequelize/models/Workspace');

const migrate = require('./sequelize/migrations');

class Bridge {
  static async connect() {

    const bridge = new Bridge();

    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: app.getPath('userData') + '/mercedes.sqlite'
    });

    Snippet.init(sequelize);
    Workspace.init(sequelize);

    await migrate(sequelize);

    // append commands

    return bridge;
  }
}

module.exports = Bridge;
