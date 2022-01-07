require('dotenv').config();
const http = require('http')
const createServerExpress = require('./Infrastrutures/Http/createServer');
const container = require('./Infrastrutures/Container');
const createSocket = require('./Infrastrutures/Socket/createSocket');

(() => {
  const port = process.env.PORT;
  // configure http server
  const app = createServerExpress(container);
  const server = http.createServer(app);

  // add socket server
  createSocket(server);

  // start server
  server.listen(port);
})();
