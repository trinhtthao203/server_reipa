'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Juridicals extends Model {
    static associate(models) {
      // define association here
    }
  }
  Juridicals.init({
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Juridicals',
  });
  return Juridicals;
};