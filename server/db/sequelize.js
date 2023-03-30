// const {configure} = require('../config/config');
// const env = configure.NODE_ENV === 'production' ? 'production' : 'development';
const { Sequelize } = require('sequelize');
const configFile = require('../config/sequelize');

const config = configFile['production'];
const sequelize = new Sequelize(config);


const modelDefiners = [
  require('./models/users'),
  require('./models/orders'),
  require('./models/customize'),
  require('./models/products'),
  require('./models/categories'),
  require('./models/productRatings'),
  require('./models/sell'),
  require('./models/transactions'),
  require('./models/orderProductMapping'),
  
]

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

module.exports = sequelize