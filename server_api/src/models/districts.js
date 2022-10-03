'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Districts extends Model {
    static associate(models) {
      // define association here
    }
  }
  Districts.init({
    name: DataTypes.STRING,
    prefix: DataTypes.STRING,
    province_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Districts',
  });
  return Districts;
};