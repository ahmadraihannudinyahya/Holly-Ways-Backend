const express = require('express');
const register = require('../../Interfaces/Http/Api/Register');

const createServer = (container) => {
  const app = express();

  app.use(express.json())

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use('/api/v1', register(container));

  return app;
};
module.exports = createServer;
