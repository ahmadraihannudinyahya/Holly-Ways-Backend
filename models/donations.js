/* istanbul ignore file */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Donations.belongsTo(models.Users, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
      Donations.belongsTo(models.Funds, {
        as : 'fund',
        foreignKey : {
          name : 'fundId'
        }
      })
    }
  };
  Donations.init({
    id:{
      type:DataTypes.STRING,
      primaryKey: true
    },
    donateAmount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    proofAttachment: DataTypes.TEXT,
    userId: DataTypes.STRING,
    fundId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Donations',
  });
  return Donations;
};