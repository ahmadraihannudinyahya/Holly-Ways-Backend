const createServer = require('./Infrastrutures/Http/createServer');

(()=>{
  const app = createServer();
  app.listen(3000, ()=>console.log('app listten on port 3000'));
})()