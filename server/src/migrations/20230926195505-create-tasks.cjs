"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "tasks",
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          date: {
            type: Sequelize.STRING,
            defaultValue: Sequelize.NOW,
            allowNull: false,
          },
          completed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          userId: {
            type:  Sequelize.UUID,
            references: {
              model: {
                tableName: "users",
              },
              key: "id",
            },
            onDelete: 'SET NULL',
            // onDelete: 'CASCADE',
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

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("tasks", { transaction });
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },
};
