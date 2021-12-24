require('dotenv').config();
const createServer = require('./Infrastrutures/Http/createServer');
const container = require('./Infrastrutures/Container');

(() => {
  const port = process.env.PORT;
  const app = createServer(container);
  app.listen(port);
})();
