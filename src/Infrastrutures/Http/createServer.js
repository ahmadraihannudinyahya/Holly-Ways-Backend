const express = require('express');
const multer = require('multer');

const register = require('../../Interfaces/Http/Api/Register');
const Login = require('../../Interfaces/Http/Api/Login');
const User = require('../../Interfaces/Http/Api/User');
const Fund = require('../../Interfaces/Http/Api/Fund');

const ClientError = require('../../Commons/Exceptions/ClientError');

const createServer = (container) => {
  const app = express();
  const midleware = {
    fileHandle: (key) => multer().single(key),
  };
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use('/api/v1', register(container));
  app.use('/api/v1', Login(container));
  app.use('/api/v1', User(container));
  app.use('/api/v1', Fund(container, midleware));

  app.use((error, req, res, next) => {
    if (error) {
      if (error instanceof ClientError) {
        return res.status(error.statusCode).send({ status: 'fail', message: error.message });
      }
      return res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
  });
  return app;
};
module.exports = createServer;
