/* istanbul ignore file */
const io = require("socket.io-client");

const socket = io(process.env.SOCKET_HOST||`http://localhost:5000`);

module.exports = socket;