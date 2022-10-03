'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Investors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Investors.init({
    name: DataTypes.STRING,
    address: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    street_id: DataTypes.INTEGER,
    ward_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Investors',
  });
  return Investors;
};