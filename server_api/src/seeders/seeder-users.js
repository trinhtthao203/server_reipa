'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      phonenumber: "0986405456",
      password: "'$2a$10$qpNKUWtlDp7EMWXm/FGz5OFmClLWGmwCIDBm.PSSfcbI6MaRM.YMe'",
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
      phonenumber: "0986405457",
      password: "'$2a$10$qpNKUWtlDp7EMWXm/FGz5OFmClLWGmwCIDBm.PSSfcbI6MaRM.YMe'",
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
      phonenumber: "0369369369",
      password: "'$2a$10$qpNKUWtlDp7EMWXm/FGz5OFmClLWGmwCIDBm.PSSfcbI6MaRM.YMe'",
      fullname: "Trịnh Thị Thanh Trúc",
      address: "1/1",
      street_id: 20204,
      ward_id: 2375,
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