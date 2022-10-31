"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasOne(models.Images, { foreignKey: "relation_id" });
      Users.hasMany(models.Posts, { foreignKey: "user_id" })
      Users.hasMany(models.Planning_areas, { foreignKey: "user_id" })
      Users.belongsTo(models.Roles, { foreignKey: "role_id" });
      Users.belongsTo(models.Streets, { foreignKey: "street_id" });
      Users.belongsTo(models.Wards, { foreignKey: "ward_id" });
    }
  }
  Users.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    phonenumber: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    address: DataTypes.STRING,
    street_id: DataTypes.INTEGER,
    ward_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Users",
  });
  return Users;
};