'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Planning_areas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      function: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.FLOAT
      },
      address: {
        type: Sequelize.STRING
      },
      geometry: {
        type: Sequelize.GEOMETRY
      },
      ward_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      investor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Investors",
          key: "id"
        }
      },
      typeof_planning_area_id: {
        type: Sequelize.INTEGER
      },
      status_id: {
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
    await queryInterface.dropTable('Planning_areas');
  }
};