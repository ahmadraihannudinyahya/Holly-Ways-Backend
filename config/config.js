/* istanbul ignore file */
require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port" : process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT,
    "logging" : false,
  },
  "test": {
    "username": process.env.DBTEST_USER,
    "password": process.env.DBTEST_PASSSWORD,
    "database": process.env.DBTEST_NAME,
    "host": process.env.DBTEST_HOST,
    "port" : process.env.DBTEST_PORT,
    "dialect": process.env.DBTEST_DIALECT,
    "logging" : false,
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "protocol": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
};