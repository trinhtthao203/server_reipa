'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Role', [{
      name: "Admin",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Employee",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "User",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Role', null, {});
  }
};