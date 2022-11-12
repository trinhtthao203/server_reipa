"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Provinces extends Model {
    static associate(models) {
      Provinces.hasMany(models.Districts, { foreignKey: "province_id" });
      Provinces.hasMany(models.Streets, { foreignKey: "province_id" });
      Provinces.hasMany(models.Zonings, { foreignKey: "province_id" });
      Provinces.belongsTo(models.Nations, { foreignKey: "nation_id" });
    }
  }
  Provinces.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    geometry: DataTypes.GEOMETRY,
    nation_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Provinces",
  });
  return Provinces;
};