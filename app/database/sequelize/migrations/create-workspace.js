module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Workspace', {
      name: Sequelize.STRING,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Workspace');
  }
};
