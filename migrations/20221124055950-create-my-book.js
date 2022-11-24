"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MyBooks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      MemberId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Members",
          },
          key: "id",
        },
      },
      BookId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Books",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MyBooks");
  },
};
