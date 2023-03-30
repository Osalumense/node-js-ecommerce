'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productRatings', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID
      },
      productId: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      userId: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      rating: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      review: { 
        type: Sequelize.STRING, 
        allowNull: false 
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
    await queryInterface.dropTable('productRatings');
  }
};