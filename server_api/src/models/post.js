'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    area: DataTypes.STRING,
    juridical_id: DataTypes.INTEGER,
    furniture_id: DataTypes.INTEGER,
    structure: DataTypes.INTEGER,
    bedroom: DataTypes.INTEGER,
    toilet: DataTypes.INTEGER,
    street_id: DataTypes.INTEGER,
    coordinates: DataTypes.GEOMETRY,
    introduction: DataTypes.TEXT,
    typeof_real_estate_id: DataTypes.INTEGER,
    typeof_post_id: DataTypes.INTEGER,
    approved: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};