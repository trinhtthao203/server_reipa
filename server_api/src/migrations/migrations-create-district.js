'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('District', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      prefix: {
        type: Sequelize.STRING
      },
      province_id: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('District');
  }
};