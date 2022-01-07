module.exports = (io) => {
  io.on('connection',async (socket) =>{
    socket.on('broadNotification', async (message)=>{
      socket.send(message);
    });
  })
}