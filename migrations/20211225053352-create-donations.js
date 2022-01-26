/* istanbul ignore file */
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Donations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      donateAmount: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING,
        defaultValue : 'pending'
      },
      proofAttachment: {
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.STRING,
        references : {
          model : {
            tableName : 'Users'
          },
          key : 'id'
        },
      },
      fundId: {
        type: Sequelize.STRING,
        references : {
          model : {
            tableName : 'Funds'
          },
          key : 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Donations');
  }
};