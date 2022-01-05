'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Funds', 'status', { 
      type: Sequelize.STRING,
      defaultValue: 'open',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Funds', 'status');
  }
};
