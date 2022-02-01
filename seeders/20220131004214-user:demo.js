'use strict';

const { nanoid } = require("nanoid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [
     {
      id : `user-${nanoid()}`, 
      fullname : 'user test', 
      email : 'test@mail.com', 
      password : 'encripted password', 
     }, 
     {
      id : `user-${nanoid()}`, 
      fullname : 'user fake', 
      email : 'fake@mail.com', 
      password : 'encripted password', 
     },
    ]); 
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
