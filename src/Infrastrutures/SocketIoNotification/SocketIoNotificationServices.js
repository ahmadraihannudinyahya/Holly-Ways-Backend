const NotificationServices = require("../../Aplications/Notification/NotificationServices");
const io = require("socket.io-client");

class SocketIoNotificationServices extends NotificationServices{
  constructor(){
    super();
  }
  broadNotification(message){
    const socket = io('http://localhost:5000');
    socket.on('connect', ()=>{
      socket.emit('broadNotification', message);
    });
  }
}
module.exports = SocketIoNotificationServices;