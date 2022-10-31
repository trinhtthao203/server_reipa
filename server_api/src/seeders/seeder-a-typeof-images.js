'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Typeof_images', [{
      name: "Người dùng",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Chủ đầu tư",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Vùng quy hoạch",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Bài đăng",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Typeof_images', null, {});
  }
};