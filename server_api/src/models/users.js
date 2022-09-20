'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    phonenumber: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    address: DataTypes.STRING,
    street_id: DataTypes.INTEGER,
    ward_id: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};