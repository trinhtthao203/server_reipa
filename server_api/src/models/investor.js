'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Investor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Investor.init({
    name: DataTypes.STRING,
    address: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    street_id: DataTypes.INTEGER,
    ward_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Investor',
  });
  return Investor;
};