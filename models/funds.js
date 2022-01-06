'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Funds.hasMany(models.Donations, {
        as: "donations",
        foreignKey: {
          name: "fundId",
        },
      });
    }
  };
  Funds.init({
    id:{
      type:DataTypes.STRING,
      primaryKey: true
    },
    title: DataTypes.STRING,
    thumbnail: DataTypes.TEXT,
    goal: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    owner: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Funds',
  });
  return Funds;
};