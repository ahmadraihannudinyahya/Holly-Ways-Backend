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
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging" : false,
  }
};