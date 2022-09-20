'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Typeof_post extends Model {
    static associate(models) {
      // define association here
    }
  }
  Typeof_post.init({
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Typeof_post',
  });
  return Typeof_post;
};