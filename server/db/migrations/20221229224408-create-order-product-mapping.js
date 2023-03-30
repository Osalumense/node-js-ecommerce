'use strict';
const sequelize = require('../../config/sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orderProductMapping', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.UUID, 
        allowNull: false,
        // references: {
        //   model: 'orders',
        //   key: 'id'
        // },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE'
      },
      productId: { 
        type: Sequelize.UUID,
        allowNull: false,
        // references: {
        //   model: 'products',
        //   key: 'id'
        // },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE'
      },
      quantity: {
        type: Sequelize.INTEGER, 
        allowNull: false 
      },
      price: {
        type: Sequelize.DECIMAL(10, 2), 
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
    await queryInterface.dropTable('orderProductMapping');
  }
};