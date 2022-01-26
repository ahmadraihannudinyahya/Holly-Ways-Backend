class StorageServices {
  async uploadFile() {
    throw new Error('StorageServices is abstract class');
  }

  async deleteFile() {
    throw new Error('StorageServices is abstract class');
  }
}

module.exports = StorageServices;
