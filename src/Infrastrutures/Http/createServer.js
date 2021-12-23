const express = require('express');
const register = require('../../Interfaces/Http/Api/Register');
const Login = require('../../Interfaces/Http/Api/Login');

const createServer = (container) => {
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use('/api/v1', register(container));
  app.use('/api/v1', Login(container));

  return app;
};
module.exports = createServer;
