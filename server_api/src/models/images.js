"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    static associate(models) {
      Images.belongsTo(models.Planning_areas, { foreignKey: "relation_id" });
      Images.belongsTo(models.Users, { foreignKey: "relation_id" });
      Images.belongsTo(models.Posts, { foreignKey: "relation_id" });
      Images.belongsTo(models.Investors, { foreignKey: "relation_id" });
      Images.belongsTo(models.Typeof_images, { foreignKey: "typeof_image_id" })
    }
  }
  Images.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    url: DataTypes.STRING,
    relation_id: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Images",
  });
  return Images;
};