const StorageServices = require('../StorageServices');

describe('StorageServices test', () => {
  it('should throw error when invoke unimplemented method', async () => {
    const storageServices = new StorageServices();

    await expect(storageServices.uploadFile()).rejects.toThrowError('StorageServices is abstract class');
    await expect(storageServices.deleteFile()).rejects.toThrowError('StorageServices is abstract class');
  });
});
