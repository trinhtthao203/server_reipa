"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Typeof_images extends Model {
    static associate(models) {
      Typeof_images.hasMany(models.Images, { foreignKey: "typeof_image_id" });
    }
  }
  Typeof_images.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Typeof_images",
  });
  return Typeof_images;
};