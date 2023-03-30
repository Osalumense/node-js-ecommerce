const { sequelize, DataTypes } = require('sequelize');
// const order = require('./orders');
// const { models } = require('../../db/sequelize');

module.exports = (sequelize) => {
	const orderProductMapping = sequelize.define('orderProductMapping', {
    orderId: {
      type: DataTypes.STRING, 
      allowNull: false 
    },
    productId: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    quantity: {
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false 
    }
  },
  {
    paranoid: true,
    defaultScope: {
      modelName: 'orderProductMapping',
      attributes: {
        exclude: ['deletedAt']
      },
      order: [['id', 'DESC']]
    }
  },
  {});
  // orderProductMapping.belongsTo(order);
  orderProductMapping.associate = (models) => {
    orderProductMapping.belongsTo(models.orders, {foreignKey: 'id', as: 'orders'}),
    orderProductMapping.belongsTo(models.products, {foreignKey: 'id', as: 'product'})
  };
  return orderProductMapping;

};