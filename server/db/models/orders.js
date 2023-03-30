const { sequelize, DataTypes } = require('sequelize');
// const { models } = require('../../db/sequelize');

module.exports = (sequelize) => {
	const orders = sequelize.define('orders', {
    allProduct: {
      type: DataTypes.TEXT, 
      allowNull: false,
      get() {
        return allProduct = JSON.parse(this.getDataValue('allProduct'));
      }
    },
    user: {
      type: DataTypes.STRING, 
      allowNull: false 
    },
    amount: { 
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false 
    },
    transactionId: {
      type: DataTypes.STRING, 
      allowNull: false 
    },
    address: {
      type: DataTypes.STRING, 
      allowNull: true 
    },
    phone: { 
      type: DataTypes.STRING, 
      allowNull: true,
    },
    status: { 
      type: DataTypes.ENUM,
      values: [
        'Not processed', 
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled'
      ],
      defaultValue: 'Not processed'
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
  }, 
  {}
);
// orders.associate = (models) => {
//   orders.hasMany(models.orderProductMapping, {
//     foreignKey: 'orderId',
//     as: 'orderProducts',
//     onDelete: "cascade"  
//   })
// };
return orders;
}

// class orders extends Model {};

// orders.init({
//   user: { 
//     type: DataTypes.STRING, 
//     allowNull: false 
//   },
//   amount: { 
//     type: DataTypes.DECIMAL(10, 2), 
//     allowNull: false 
//   },
//   transactionId: {
//     type: DataTypes.STRING, 
//     allowNull: false 
//   },
//   address: {
//     type: DataTypes.STRING, 
//     allowNull: true 
//   },
//   phone: { 
//     type: DataTypes.STRING, 
//     allowNull: true,
//   },
//   status: { 
//     type: DataTypes.ENUM,
//     values: [
//       'Not processed', 
//       'Processing',
//       'Shipped',
//       'Delivered',
//       'Cancelled'
//     ]
//   },
// },
// {
//   paranoid: true,
//   defaultScope: {
//     attributes: {
//       exclude: ['deletedAt']
//     },
//     order: [['id', 'DESC']]
//   }
// },
// )