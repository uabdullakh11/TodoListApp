"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "refreshToken",
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
          },
          userId: {
            type: Sequelize.UUID,
            references: {
              model: {
                tableName: "users",
              },
              key: "id",
            },
            // onDelete: 'SET NULL',
            onDelete: 'CASCADE'
          },
          token: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          expiryDate: {
            type: Sequelize.DATE,
            defaultValue:  Sequelize.NOW, 
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        },
        { transaction }
      );
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("refreshToken", { transaction });
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },
};
