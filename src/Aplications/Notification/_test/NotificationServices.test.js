const NotificationServices = require('../NotificationServices');

describe('NotificationServices test', ()=>{
  it('should throw error when invoke unimplemented method', async () => {
    const notificationServices = new NotificationServices();
    await expect(notificationServices.broadNotification()).rejects.toThrowError('NotificationServices is abstract class');
  });
});