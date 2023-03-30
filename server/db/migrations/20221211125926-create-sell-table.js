'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sell', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: { 
      type: Sequelize.STRING, 
      allowNull: false 
      },
      email: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      whatsappContact: { 
        type: Sequelize.STRING, 
        allowNull: false
      },
      address: {
        type: Sequelize.TEXT, 
        allowNull: false 
      },
      amount: { 
        type: Sequelize.DECIMAL(10, 2), 
        allowNull: false 
      },
      category: {
        type: Sequelize.STRING, 
        allowNull: true 
      },
      deviceName: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      isSwap: { 
        type: Sequelize.BOOLEAN, 
        allowNull: true,
        defaultValue: false 
      },
      isSale: { 
        type: Sequelize.BOOLEAN, 
        allowNull: true,
        defaultValue: false 
      },
      offerAccepted: { 
        type: Sequelize.BOOLEAN, 
        allowNull: true,
        defaultValue: false
      },
      preferredDevice: {
        type: Sequelize.STRING, 
        allowNull: true
      },
      extraNotes: {
        type: Sequelize.TEXT, 
        allowNull: false 
      },
      images: {
        type: Sequelize.TEXT, 
        allowNull: false
      },
      offer: {
        type: Sequelize.TEXT, 
        allowNull: false
      },
      offerAmount: { 
        type: Sequelize.DECIMAL(10, 2), 
        allowNull: false 
      },
      status: { 
        type: Sequelize.ENUM,
        values: [
          'Not processed', 
          'Offer Accepted',
          'Offer Rejected',
          'Received',
          'Delivered',
          'Cancelled'
        ],
        defaultValue: 'Not processed',
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
    await queryInterface.dropTable('sell');
  }
};