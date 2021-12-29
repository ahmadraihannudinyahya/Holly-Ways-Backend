const path = require('path');
const fs = require('fs');

const StorageServices = require('../../Aplications/Storage/StorageServices');

class LocalStorageServices extends StorageServices {
  constructor() {
    super();
    const pathStorage =  process.env.NODE_ENV === 'test' ? path.join(__dirname, '../../../uploads_test') : path.join(__dirname, '../../../uploads');
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
        return resolve(`${process.env.HOST}:${process.env.PORT}${process.env.ENDPOINT_FILE}/${fileName}`);
      });
    });
  }

  async deleteFile(file) {
    const fileName = file[file.length-1];
    const pathFile = path.join(this.pathStorage, fileName);
    if (fs.existsSync(pathFile)) {
      fs.unlinkSync(pathFile);
    }
  }
}

module.exports = LocalStorageServices;
