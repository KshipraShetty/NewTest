module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('books', 'like', Sequelize.BOOLEAN), {
      defaultValue: false,
    };
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('books', 'like');
  },
};
