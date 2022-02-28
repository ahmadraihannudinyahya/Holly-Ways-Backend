const fs = require('fs');
const path = require('path');

const testImage = path.join(__dirname, '../../../../testImage.jpg');
const LocalStorageServices = require('../LocalStorageServices');

describe('LocalStorageServices test', () => {
  it('should create create folder uploads and uploadtest corectly', () => {
    const uploadsTestPath = path.join(__dirname, '../../../../uploads_test');
    if (fs.existsSync(uploadsTestPath)) {
      fs.rmdirSync(uploadsTestPath, { recursive: true, force: true });
    }
    new LocalStorageServices();
    expect(fs.existsSync(uploadsTestPath)).toEqual(true);
  });
  describe('uploadFile test', () => {
    it('should throw error when buffer not valid', async () => {
      const file = {
        originalName: 'image.png',
        buffer: [],
      };
      const localStorageServices = new LocalStorageServices();
      await expect(localStorageServices.uploadFile(file)).rejects.toThrowError("Cannot read property 'substring' of undefined");
    });
  });
  describe('deleteFile test', () => {
    it('should not throw error when delete not found file', async () => {
      const uploadsTestPath = path.join(__dirname, '../../../../uploads_test');
      const localStorageServices = new LocalStorageServices();
      await expect(localStorageServices.deleteFile('testImage.jpg')).resolves.not.toThrowError();
    });
  });
});
