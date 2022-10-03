'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Typeof_planning_areas', [{
      name: "Khu đô thị mới",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Căn hộ",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Cao ốc, văn phòng",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Trung tâm thương mại",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Khu phức hợp",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Nhà biệt thự, liền kề",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Nhà ở xã hội",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "Khu nghỉ dưỡng sinh thái",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Khu công nghiệp",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Bất động sản khác",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Typeof_planning_areas', null, {});
  }
};