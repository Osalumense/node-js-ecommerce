'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID
      },
      firstName: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      lastName: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      email: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true 
      },
      phoneNumber: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      password: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      userRole: { 
        type: Sequelize.INTEGER, 
        allowNull: false
      },
      userImage: { 
        type: Sequelize.STRING, 
        allowNull: false,
        defaultValue: 'user.png'
      },
      isVerified: { 
        type: Sequelize.BOOLEAN, 
        allowNull: false,
        defaultValue: false
      },
      address: { 
        type: Sequelize.STRING, 
        allowNull: true 
      },
      dob: { 
        type: Sequelize.DATE, 
        allowNull: true
      },
      secretKey: { 
        type: Sequelize.STRING,
        allowNull: true
      },
      history: { 
        type: Sequelize.TEXT, 
        allowNull: true
      },
      token: Sequelize.STRING,
      tokenExpire: Sequelize.DATE,
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
    await queryInterface.dropTable('users');
  }
};