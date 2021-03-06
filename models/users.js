/* istanbul ignore file */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasOne(models.Profiles, {
        as: "profile",
        foreignKey: {
          name: "userId",
        },
      });
    }
  };
  Users.init({
    id:{
      type:DataTypes.STRING,
      primaryKey: true
    },
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    fullname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};