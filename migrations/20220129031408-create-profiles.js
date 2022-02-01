/* istanbul ignore file */
const { nanoid } = require('nanoid');
const { Users, Profiles } = require('../models');
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
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
      image: {
        type: Sequelize.TEXT
      },
      phone: {
        type: Sequelize.STRING
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
    const userData = await Users.findAll();
    const createProfile = async ( user ) => {
      Profiles.create({id : `profile-${nanoid()}`, userId : user.id});
    };
    Promise.all(userData.map(user => createProfile(user)));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Profiles');
  }
};