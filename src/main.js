const createServer = require('./Infrastrutures/Http/createServer');
const container = require('./Infrastrutures/Container');

(() => {
  const port = 5000;
  const app = createServer(container);
  app.listen(port);
})();
