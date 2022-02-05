const { Readable } = require("stream");
const StorageServices = require("../../Aplications/Storage/StorageServices");

class CloudenarySotorageServices extends StorageServices{
  constructor(cloudenary){
    super();
    this.cloudenary = cloudenary;
    this.folder = 'holly_ways';
  }

  bufferToStreamConvert(buffer){
    const readable = new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      },
    });
    return readable;
  }

  uploadFile(file){
    return new Promise((resolve, reject) => {
      const stream = this.cloudenary.uploader.upload_stream(
        { folder: this.folder },
        (error, result) => {
          if (error) return reject(error);
          return resolve(result.secure_url );
        }
      );
      this.bufferToStreamConvert(file.buffer).pipe(stream);
    });
  }

  deleteFile(fileUrl){
    return new Promise((resolve, reject) => {
      const fileUrlArr = fileUrl.split('/');
      const fileName = fileUrlArr[fileUrlArr.length - 1];
      this.cloudenary.uploader.destroy(fileName, ( error, result ) => {
        if(error) return reject(error);
        resolve();
      });
    });
  }
}
module.exports = CloudenarySotorageServices;