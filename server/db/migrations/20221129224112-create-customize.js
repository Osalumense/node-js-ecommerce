'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customizes', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID
      },
      slideImage: { 
        type: Sequelize.TEXT,
      },
      firstShow: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        defaultValue: 0
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
    await queryInterface.dropTable('customizes');
  }
};