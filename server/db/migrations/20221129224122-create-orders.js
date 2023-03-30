'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      allProduct: {
        type: Sequelize.TEXT, 
        allowNull: false
      },
      user: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2), 
        allowNull: false 
      },
      transactionId: {
        type: Sequelize.STRING, 
        allowNull: false 
      },
      address: {
        type: Sequelize.STRING, 
        allowNull: false 
      },
      phone: { 
        type: Sequelize.STRING, 
        allowNull: false,
      },
      status: { 
        type: Sequelize.ENUM,
        values: [
          'Not processed', 
          'Processing',
          'Shipped',
          'Delivered',
          'Cancelled'
        ]
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
    await queryInterface.dropTable('orders');
  }
};