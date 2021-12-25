class StorageServices {
  uploadFile() {
    throw new Error('StorageServices is abstract class');
  }

  deleteFile() {
    throw new Error('StorageServices is abstract class');
  }
}

module.exports = StorageServices;
