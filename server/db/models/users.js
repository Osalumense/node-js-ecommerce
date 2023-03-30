const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    firstName: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    lastName: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true 
    },
    phoneNumber: { 
      type: DataTypes.STRING, 
      allowNull: true, 
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    userRole: { 
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    userImage: { 
      type: DataTypes.STRING, 
      allowNull: false,
      defaultValue: 'user.png'
    },
    isVerified: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    address: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    dob: { 
      type: DataTypes.DATE, 
      allowNull: true
    },
    secretKey: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    isVerified: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
    token: DataTypes.STRING,
    tokenExpire: DataTypes.DATE,
    history: {
      type: DataTypes.TEXT, 
      allowNull: true
    }
  },
  {
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['password', 'deletedAt']
      },
      order: [['id', 'DESC']]
    }
  });
};