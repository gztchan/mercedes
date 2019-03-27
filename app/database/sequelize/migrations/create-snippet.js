module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Snippet', {
      name: Sequelize.STRING,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Snippet');
  }
};
