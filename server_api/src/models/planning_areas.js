"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Planning_areas extends Model {
    static associate(models) {
      Planning_areas.belongsTo(models.Investors, { foreignKey: "investor_id" });
      Planning_areas.belongsTo(models.Wards, { foreignKey: "ward_id" });
      Planning_areas.belongsTo(models.Users, { foreignKey: "user_id" });
      Planning_areas.belongsTo(models.Typeof_planning_areas, { foreignKey: "typeof_planning_area_id" });
      Planning_areas.belongsTo(models.Status, { foreignKey: "status_id" });
      Planning_areas.hasMany(models.Images, { foreignKey: "relation_id" });
    }
  }
  Planning_areas.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    function: DataTypes.STRING,
    area: DataTypes.FLOAT,
    address: DataTypes.STRING,
    geometry: DataTypes.GEOMETRY,
    ward_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    investor_id: DataTypes.INTEGER,
    typeof_planning_area_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Planning_areas",
  });
  return Planning_areas;
};