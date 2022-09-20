'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Typeof_planning_area extends Model {
    static associate(models) {
      // define association here
    }
  }
  Typeof_planning_area.init({
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Typeof_planning_area',
  });
  return Typeof_planning_area;
};