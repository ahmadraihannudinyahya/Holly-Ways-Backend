class NotificationServices {
  async broadNotification() {
    throw new Error('NotificationServices is abstract class');
  }
}
module.exports = NotificationServices;
