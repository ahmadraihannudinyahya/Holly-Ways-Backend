const express = require('express')

const createServer=()=>{
  const app = express()

  app.get('/', (req, res) => {
    res.send('Hello World!')
  });
  
  return app
}
module.exports = createServer;