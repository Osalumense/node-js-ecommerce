const config = require('../config/config')

module.exports = {
    development: {
        username: config.DB_USER,
        password: config.DB_PASSWORD,
        host: config.DB_HOST,
        database: config.DB_NAME,
        port: config.DB_PORT,
        dialect: config.SQL_DIALECT,
        logging: false,
        pool: {
			max: Number(config.SQL_POOL_LIMIT),
			min: 0,
			acquire: 30000,
			idle: 10000
		},
        define: {
			freezeTableName: true
		}
    },
    production: {
        username: config.DB_USER,
        password: config.DB_PASSWORD,
        host: config.DB_HOST,
        database: config.DB_NAME,
        port: config.DB_PORT,
        dialect: config.SQL_DIALECT,
        logging: false,
        pool: {
			max: Number(config.SQL_POOL_LIMIT),
			min: 0,
			acquire: 30000,
			idle: 10000
		},
        define: {
			freezeTableName: true
		}
    }
}