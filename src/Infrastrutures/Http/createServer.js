const express = require('express');
const register = require('../../Interfaces/Http/Api/Register');

const createServer = () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use('/api/v1', register({}));

  return app;
};
module.exports = createServer;
