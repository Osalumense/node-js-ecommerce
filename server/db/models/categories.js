const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('categories', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    cName: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    cDescription: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    cImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true
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