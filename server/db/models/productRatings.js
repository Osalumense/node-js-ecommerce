const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('productRatings', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    productId: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    userId: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    rating: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    review: { 
      type: DataTypes.STRING, 
      allowNull: false 
    }
  });
  
};