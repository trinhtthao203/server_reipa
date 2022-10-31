"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Investors extends Model {
    static associate(models) {
      Investors.hasMany(models.Planning_areas, { foreignKey: "investor_id" });
      Investors.hasMany(models.Images, { foreignKey: "relation_id" });
      Investors.belongsTo(models.Wards, { foreignKey: "ward_id" });
      Investors.belongsTo(models.Streets, { foreignKey: "street_id" });
    }
  }
  Investors.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    address: DataTypes.INTEGER,
    street_id: DataTypes.INTEGER,
    ward_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Investors",
  });
  return Investors;
};