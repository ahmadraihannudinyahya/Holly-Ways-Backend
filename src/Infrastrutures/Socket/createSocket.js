/* istanbul ignore file */
const { Server } = require('socket.io');

const createSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });
  require('../../Interfaces/Socket/Notification')(io);
};

module.exports = createSocket;
