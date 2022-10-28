'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Investors', [{
      name: "Hồng Loan Group",
      address: "112B 3/2 ",
      street_id: 178,
      ward_id: 2376,
      avatar: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Investors', null, {});
  }
};