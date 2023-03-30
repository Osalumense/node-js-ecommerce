'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID
      },
      cName: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      cDescription: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      cImage: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cStatus: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');
  }
};