const path = require('path');

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const morgen = require('morgan')

const register = require('../../Interfaces/Http/Api/Register');
const Login = require('../../Interfaces/Http/Api/Login');
const User = require('../../Interfaces/Http/Api/User');
const Fund = require('../../Interfaces/Http/Api/Fund');
const Donation = require('../../Interfaces/Http/Api/Donation');

const ClientError = require('../../Commons/Exceptions/ClientError');

const createServer = (container) => {
  const app = express();
  const midleware = {
    fileHandle: (key) => multer().single(key),
  };
  app.use(express.json());
  app.use(cors());
  app.use(morgen('dev'))
  /* istanbul ignore next */
  const pathFile = process.env.NODE_ENV === 'test' ? '../../../uploads_test' : '../../../uploads';
  app.use(process.env.ENDPOINT_FILE, express.static(path.join(__dirname, pathFile)));

  app.use('/api/v1', register(container));
  app.use('/api/v1', Login(container));
  app.use('/api/v1', User(container, midleware));
  app.use('/api/v1', Fund(container, midleware));
  app.use('/api/v1', Donation(container, midleware));

  app.use((error, req, res, next) => {
    /* istanbul ignore next */
    if (error) {

      if (error instanceof ClientError) {
        return res.status(error.statusCode).send({ status: 'fail', message: error.message });
      }
      console.log(error);
      return res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
  });
  return app;
};
module.exports = createServer;
