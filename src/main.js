const createServer = require('./Infrastrutures/Http/createServer');

(()=>{
  const port = 5000;
  const app = createServer();
  app.listen(port)
})()