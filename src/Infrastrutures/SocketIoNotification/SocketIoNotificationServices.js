const NotificationServices = require("../../Aplications/Notification/NotificationServices");

class SocketIoNotificationServices extends NotificationServices{
  constructor(io){
    super();
    this.io = io;
  }
  broadNotification(message){
    const socket = this.io(process.env.SOCKET_HOST||`http://localhost:5000`);
    socket.on('connect', ()=>{
      socket.emit('broadNotification', message);
    });
  }
}
module.exports = SocketIoNotificationServices;