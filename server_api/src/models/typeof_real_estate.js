'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Typeof_real_estate extends Model {
    static associate(models) {
      // define association here
    }
  }
  Typeof_real_estate.init({
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Typeof_real_estate',
  });
  return Typeof_real_estate;
};