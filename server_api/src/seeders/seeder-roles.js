'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [{
      name: "Admin",
      icon: "admin-panel-settings",
      description: "Quản lý tài khoản, cấp quyền tài khoản, quản lý danh mục( quyền sử dụng ),",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Nhân viên",
      icon: "supervised-user-circle",
      description: "Quản lý các thành phần của ứng dụng, dưới quyền của Admin",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Người dùng thường",
      icon: "people",
      description: "Có nhu cầu trực tiếp mua, bán, thuê, cho thuê Bất động sản",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Chuyên viên môi giới",
      icon: "home-work",
      description: "Người chuyên môi giới tư vấn, tìm kiếm khách hàng và các nhu cầu bất động sản",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};