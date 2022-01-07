module.exports = (io) => {
  io.on('connection', (socket) =>{
    socket.on('broadNotification',  (message)=>{
      io.emit('message', message);
    });
  })
}