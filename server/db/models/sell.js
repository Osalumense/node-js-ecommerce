const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('sell', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false 
    },
    whatsappContact: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    amount: { 
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false 
    },
    category: {
      type: DataTypes.STRING, 
      allowNull: true 
    },
    deviceName: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    isSwap: { 
      type: DataTypes.BOOLEAN, 
      allowNull: true,
      defaultValue: false 
    },
    isSale: { 
      type: DataTypes.BOOLEAN, 
      allowNull: true,
      defaultValue: false 
    },
    offerAccepted: { 
      type: DataTypes.BOOLEAN, 
      allowNull: true,
      defaultValue: false
    },
    preferredDevice: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    extraNotes: {
      type: DataTypes.TEXT, 
      allowNull: false
    },
    images: {
      type: DataTypes.TEXT, 
      allowNull: false,
      get() {
        return images = JSON.parse(this.getDataValue('images'));
      }
    },
    offer: {
      type: DataTypes.TEXT, 
      allowNull: true
    },
    offerAmount: { 
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: true 
    },
    status: { 
      type: DataTypes.ENUM,
      values: [
        'Not processed',
        'Processing',
        'Offer Accepted',
        'Offer Rejected',
        'Received',
        'Delivered',
        'Cancelled'
      ],
      defaultValue: 'Not processed',
    }    
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