const path = require('path');
const StorageServices = require('../../Aplications/Storage/StorageServices');

class LocalStorageServices extends StorageServices {
  constructor() {
    super();
    const pathStorage = path.join(__dirname, '../../../uploads');
    if (!fs.existsSync(pathStorage)) {
      fs.mkdirSync(pathStorage);
    }
    this.pathStorage = pathStorage;
  }

  async uploadFile(file) {
    return new Promise((resolve, reject) => {
      const fileExt = file.originalname.substring(file.originalname.lastIndexOf('.')).toLowerCase();
      const fileName = Date.now() + fileExt;
      const filepath = path.join(this.pathStorage, fileName);
      fs.writeFile(filepath, file.buffer, (error) => {
        if (error) {
          return reject(new Error(error));
        }
        return resolve(fileName);
      });
    });
  }
}

module.exports = LocalStorageServices;
