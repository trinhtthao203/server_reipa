"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Typeof_planning_areas extends Model {
    static associate(models) {
      Typeof_planning_areas.hasMany(models.Planning_areas, { foreignKey: "typeof_planning_area_id" });
    }
  }
  Typeof_planning_areas.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: "Typeof_planning_areas",
  });
  return Typeof_planning_areas;
};