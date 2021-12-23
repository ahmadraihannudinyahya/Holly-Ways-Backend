const express = require('express');
const register = require('../../Interfaces/Http/Api/Register');
const Login = require('../../Interfaces/Http/Api/Login');

const ClientError = require('../../Commons/Exceptions/ClientError');

const createServer = (container) => {
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use('/api/v1', register(container));
  app.use('/api/v1', Login(container));

  app.use((error, req, res, next) => {
    if (error) {
      if (error instanceof ClientError) {
        res.status(error.statusCode).send({ status: 'fail', message: error.message });
      }
      res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
  });
  return app;
};
module.exports = createServer;
