require ('dotenv').config();

const env = (key, defaultValue=null)=>{
    return process.env[key] || defaultValue;
}

const config = {
    APP_NAME: env('APP_NAME'),
    CLIENT_URL: env('CLIENT_URL'),
    SECRET_KEY: env('SECRET_KEY'), 
    JWT_EXPIRES: env('JWT_EXPIRES'),
    ADMIN_MAIL: env('ADMIN_MAIL') || 'harkugbeosaz@gmail.com',
    DB_USER: env('DB_USER'),
    DB_PASSWORD: env('DB_PASSWORD'),
    DB_HOST: env('DB_HOST'),
    DB_PORT: env('DB_PORT'),
    DB_NAME: env('DB_NAME'),
    SQL_DIALECT: env('SQL_DIALECT'),
    SQL_POOL_LIMIT: env('SQL_POOL_LIMIT'),
    NODE_ENV: env('NODE_ENV'),
    REACT_APP_EMAIL: env('REACT_APP_EMAIL'),
    REACT_APP_EMAIL_PASS: env('REACT_APP_EMAIL_PASS')
}
module.exports = config
