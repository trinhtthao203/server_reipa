"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Provinces extends Model {
    static associate(models) {
      Provinces.hasMany(models.Districts, { foreignKey: "province_id" });
      Provinces.hasMany(models.Streets, { foreignKey: "province_id" });
    }
  }
  Provinces.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    geometry: DataTypes.GEOMETRY,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Provinces",
  });
  return Provinces;
};