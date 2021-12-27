const path = require('path')
const fs = require('fs');
const filePath = path.join(__dirname, '../uploads')

const storageTestHelper = {
  cleanStorage(){
    fs.readdir(filePath, (err, files)=>{
      for (const file of files){
        fs.unlink(path.join(filePath , file), ()=>{});
      }
    })
  }
}

module.exports = storageTestHelper;

