const Umzug = require('umzug');

function logEvent(eventName) {
  return function(name, migration) {
    console.log(`${ name } ${ eventName }`);
  }
}

module.exports = async function migrate(sequelize, config) {
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: { sequelize },
    migrations: {
        params: [
            sequelize.getQueryInterface(), // queryInterface
            sequelize.constructor, // DataTypes
            function() {
                throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
            }
        ],
        path: '.',
        pattern: /\.js$/
    },
  });

  umzug.on('migrating', logEvent('migrating'));
  umzug.on('migrated',  logEvent('migrated'));

  await umzug.up();
}
