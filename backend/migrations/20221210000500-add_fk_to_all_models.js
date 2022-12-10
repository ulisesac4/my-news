"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn("Issues", "NewsletterId", {
        allowNull: true,
        onDelete: "SET NULL",
        type: Sequelize.INTEGER,
        references: {
          model: "Newsletters",
          key: "id",
        },
      }),
      queryInterface.addColumn("Issues", "TemplateId", {
        allowNull: true,
        onDelete: "SET NULL",
        type: Sequelize.INTEGER,
        references: {
          model: "Templates",
          key: "id",
        },
      }),
      queryInterface.addColumn("Newsletters", "RecipientId", {
        allowNull: true,
        onDelete: "SET NULL",
        type: Sequelize.INTEGER,
        references: {
          model: "Recipients",
          key: "id",
        },
      }),
      queryInterface.addColumn("NewsletterRecipients", "NewsletterId", {
        allowNull: true,
        onDelete: "SET NULL",
        type: Sequelize.INTEGER,
        references: {
          model: "Newsletters",
          key: "id",
        },
      }),
      queryInterface.addColumn("NewsletterRecipients", "RecipientId", {
        allowNull: true,
        onDelete: "SET NULL",
        type: Sequelize.INTEGER,
        references: {
          model: "Recipients",
          key: "id",
        },
      }),
      queryInterface.addColumn("Recipients", "NewsletterId", {
        allowNull: true,
        onDelete: "SET NULL",
        type: Sequelize.INTEGER,
        references: {
          model: "Newsletters",
          key: "id",
        },
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
