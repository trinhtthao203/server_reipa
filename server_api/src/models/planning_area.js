'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Planning_area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Planning_area.init({
    name: DataTypes.STRING,
    function: DataTypes.STRING,
    area: DataTypes.FLOAT,
    address: DataTypes.STRING,
    coordinates: DataTypes.GEOMETRY,
    street_id: DataTypes.INTEGER,
    ward_id: DataTypes.INTEGER,
    investor_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    typeof_planning_area_id: DataTypes.INTEGER,
    approved: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Planning_area',
  });
  return Planning_area;
};