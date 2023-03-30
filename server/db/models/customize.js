const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('customizes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    slideImage: { 
      type: DataTypes.TEXT,
    },
    firstShow: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 0
    }
  });
};