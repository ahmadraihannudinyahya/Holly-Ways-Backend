const express = require('express');

const createServer=()=>{
  const app = express();
  app.use(express.json);
  app.get('/', (req, res)=>{
    res.send('hello world')
  })
  return app;
}
module.exports = createServer;