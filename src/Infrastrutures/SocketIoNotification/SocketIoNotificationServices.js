const NotificationServices = require("../../Aplications/Notification/NotificationServices");

class SocketIoNotificationServices extends NotificationServices{
  constructor(socket){
    super();
    this.socket = socket;
  }
  broadNotification(message){
    if(!this.socket.connected){
      this.socket.connect();
    }
    this.socket.emit('broadNotification', message);
  }
}
module.exports = SocketIoNotificationServices;