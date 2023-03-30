const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	const orders = sequelize.define('products', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    pName: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    pDescription: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    pPrice: { 
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false 
    },
    pSold: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      defaultValue: 0 
    },
    pQuantity: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      defaultValue: 0 
    },
    pCategory: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    pImages: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return pImages = JSON.parse(this.getDataValue('pImages'));
      }
    },
    pOffer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    // paranoid: true,
    defaultScope: {
      // attributes: {
      //   exclude: ['deletedAt']
      // },
      products: [['id', 'DESC']]
    }
  },{}
  );
  
};