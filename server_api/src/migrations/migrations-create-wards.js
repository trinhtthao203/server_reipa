'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      province_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Provinces",
          key: "id"
        }
      },
      district_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Districts",
          key: "id"
        }
      },
      geometry: {
        type: Sequelize.GEOMETRY
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
    })
      //District -> Province
      .then(
        async () => {
          await queryInterface
            .addConstraint("Districts", {
              type: "FOREIGN KEY",
              fields: ["province_id"],
              name: "FK_PD",
              references: {
                table: "Provinces",
                field: "id"
              }
            })
        }
      )
      // Images -> Types of images
      .then(
        async () => {
          await queryInterface
            .addConstraint("Images", {
              type: "FOREIGN KEY",
              fields: ["relation_id"],
              name: "FK_TYP_IMG",
              references: {
                table: "Typeof_images",
                field: "id"
              }
            })
        }
      )
      //Images-> Investors
      .then(
        async () => {
          await queryInterface
            .addConstraint("Images", {
              type: "FOREIGN KEY",
              fields: ["relation_id"],
              name: "FK_INV_IMG",
              references: {
                table: "Investors",
                field: "id"
              }
            })
        }
      )

      //Images -> Users
      .then(
        async () => {
          await queryInterface
            .addConstraint("Images", {
              type: "FOREIGN KEY",
              fields: ["relation_id"],
              name: "FK_USER_IMG",
              references: {
                table: "Users",
                field: "id"
              }
            })
        }
      )
      //Images -> Planning Areas
      .then(
        async () => {
          await queryInterface
            .addConstraint("Images", {
              type: "FOREIGN KEY",
              fields: ["relation_id"],
              name: "FK_PLA_IMG",
              references: {
                table: "Planning_areas",
                field: "id"
              }
            })
        }
      )
      //Planning Area -> Investor  
      .then(
        async () => {
          await queryInterface
            .addConstraint("Planning_areas", {
              type: "FOREIGN KEY",
              fields: ["investor_id"],
              name: "FK_INV_PLA",
              references: {
                table: "Investors",
                field: "id"
              }
            })
        }
      )
      //Planning Area -> Wards  
      .then(
        async () => {
          await queryInterface
            .addConstraint("Planning_areas", {
              type: "FOREIGN KEY",
              fields: ["ward_id"],
              name: "FK_PLA_WAR",
              references: {
                table: "Wards",
                field: "id"
              }
            })
        }
      )
      //Planning Area -> Users  
      .then(
        async () => {
          await queryInterface
            .addConstraint("Planning_areas", {
              type: "FOREIGN KEY",
              fields: ["user_id"],
              name: "FK_PLA_USER",
              references: {
                table: "Users",
                field: "id"
              }
            })
        }
      )
      //Planning Area -> Typeof_planning_areas  
      .then(
        async () => {
          await queryInterface
            .addConstraint("Planning_areas", {
              type: "FOREIGN KEY",
              fields: ["typeof_planning_area_id"],
              name: "FK_PLA_TYP_AREA",
              references: {
                table: "Typeof_planning_areas",
                field: "id"
              }
            })
        }
      )
      //Planning Area -> Status  
      .then(
        async () => {
          await queryInterface
            .addConstraint("Planning_areas", {
              type: "FOREIGN KEY",
              fields: ["status_id"],
              name: "FK_PLA_STA",
              references: {
                table: "Status",
                field: "id"
              }
            })
        }
      )
      //Investor -> Streets
      .then(
        async () => {
          await queryInterface
            .addConstraint("Investors", {
              type: "FOREIGN KEY",
              fields: ["street_id"],
              name: "FK_INV_STRE",
              references: {
                table: "Streets",
                field: "id"
              }
            })
        }
      )
      //Investor -> Wards
      .then(
        async () => {
          await queryInterface
            .addConstraint("Investors", {
              type: "FOREIGN KEY",
              fields: ["ward_id"],
              name: "FK_INV_WAR",
              references: {
                table: "Wards",
                field: "id"
              }
            })
        }
      )
      //Posts -> Status
      .then(
        async () => {
          await queryInterface
            .addConstraint("Posts", {
              type: "FOREIGN KEY",
              fields: ["status_id"],
              name: "FK_POS_STA",
              references: {
                table: "Status",
                field: "id"
              }
            })
        }
      )
      //Posts -> Type of post
      .then(
        async () => {
          await queryInterface
            .addConstraint("Posts", {
              type: "FOREIGN KEY",
              fields: ["typeof_posts_id"],
              name: "FK_POS_TYPO_POS",
              references: {
                table: "Typeof_posts",
                field: "id"
              }
            })
        }
      )
      //Posts -> Type of real estates
      .then(
        async () => {
          await queryInterface
            .addConstraint("Posts", {
              type: "FOREIGN KEY",
              fields: ["typeof_real_estate_id"],
              name: "FK_POS_TYPO_REAL",
              references: {
                table: "Typeof_real_estates",
                field: "id"
              }
            })
        }
      )
      //Posts -> Type of real wards
      .then(
        async () => {
          await queryInterface
            .addConstraint("Posts", {
              type: "FOREIGN KEY",
              fields: ["ward_id"],
              name: "FK_POS_WAR",
              references: {
                table: "Wards",
                field: "id"
              }
            })
        }
      )
      //Posts -> Type of real streets
      .then(
        async () => {
          await queryInterface
            .addConstraint("Posts", {
              type: "FOREIGN KEY",
              fields: ["street_id"],
              name: "FK_POS_STR",
              references: {
                table: "Streets",
                field: "id"
              }
            })
        }
      )
      //Posts -> Type of real users
      .then(
        async () => {
          await queryInterface
            .addConstraint("Posts", {
              type: "FOREIGN KEY",
              fields: ["user_id"],
              name: "FK_POS_USER",
              references: {
                table: "Users",
                field: "id"
              }
            })
        }
      )
      //Users -> Type of real wards
      .then(
        async () => {
          await queryInterface
            .addConstraint("Users", {
              type: "FOREIGN KEY",
              fields: ["ward_id"],
              name: "FK_USER_WAR",
              references: {
                table: "Wards",
                field: "id"
              }
            })
        }
      )
      //Users -> Roles
      .then(
        async () => {
          await queryInterface
            .addConstraint("Users", {
              type: "FOREIGN KEY",
              fields: ["role_id"],
              name: "FK_USER_ROL",
              references: {
                table: "Roles",
                field: "id"
              }
            })
        }
      )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Wards');
  }
};