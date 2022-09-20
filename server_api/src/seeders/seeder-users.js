'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      phonenumber: "0000",
      password: "admin",
      fullname: "Admin System",
      address: null,
      street_id: null,
      ward_id: null,
      avatar: null,
      role_id: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      phonenumber: "0001",
      password: "employee",
      fullname: "Employee System",
      address: null,
      street_id: null,
      ward_id: null,
      avatar: null,
      role_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      phonenumber: "0986405444",
      password: "0986405444",
      fullname: "Trần Huy",
      address: "11/2",
      street_id: 1,
      ward_id: 1,
      avatar: null,
      role_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};