'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Typeof_posts extends Model {
    static associate(models) {
      // define association here
    }
  }
  Typeof_posts.init({
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Typeof_posts',
  });
  return Typeof_posts;
};