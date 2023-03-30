'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID
      },
      pName: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      pDescription: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      pPrice: { 
        type: Sequelize.DECIMAL(10, 2), 
        allowNull: false 
      },
      pSold: { 
        type: Sequelize.INTEGER, 
        allowNull: true,
        defaultValue: 0 
      },
      pQuantity: { 
        type: Sequelize.INTEGER, 
        allowNull: true,
        defaultValue: 0 
      },
      pCategory: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      pImages: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pOffer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pStatus: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
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
    await queryInterface.dropTable('products');
  }
};