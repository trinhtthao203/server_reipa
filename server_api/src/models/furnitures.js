'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Furnitures extends Model {
    static associate(models) {
      // define association here
    }
  }
  Furnitures.init({
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Furnitures',
  });
  return Furnitures;
};