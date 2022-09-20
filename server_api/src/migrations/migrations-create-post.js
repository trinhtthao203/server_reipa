'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Post', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.STRING
      },
      juridical_id: {
        type: Sequelize.INTEGER
      },
      furniture_id: {
        type: Sequelize.INTEGER
      },
      number_of_floors: {
        type: Sequelize.STRING
      },
      bedroom: {
        type: Sequelize.STRING
      },
      toilet: {
        type: Sequelize.STRING
      },
      street_id: {
        type: Sequelize.INTEGER
      },
      coordinates: {
        type: Sequelize.GEOMETRY
      },
      approved: {
        type: Sequelize.STRING
      },
      introduction: {
        type: Sequelize.TEXT
      },
      typeof_real_estate_id: {
        type: Sequelize.INTEGER
      },
      typeof_post_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Post');
  }
};