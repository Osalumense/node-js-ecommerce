const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('transactions', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    transactionId: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    transactionRef: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    status: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    amount: { 
      type: DataTypes.DECIMAL(10,2), 
      allowNull: true,
    },
    flwReference: { 
      type: DataTypes.STRING,
    },
    userId: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
  },
  {
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['deletedAt']
      },
      order: [['id', 'DESC']]
    }
  });
  
};