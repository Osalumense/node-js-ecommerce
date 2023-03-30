'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID
      },
      transactionId: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      transactionRef: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      status: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      amount: { 
        type: Sequelize.DECIMAL(10,2), 
        allowNull: true,
      },
      flwReference: { 
        type: Sequelize.STRING,
      },
      userId: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      deletedAt: {
        allowNull: false,
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
    await queryInterface.dropTable('transactions');
  }
};