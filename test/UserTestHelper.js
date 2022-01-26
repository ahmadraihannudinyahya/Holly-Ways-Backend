/* istanbul ignore file */
const {Users} = require('../models')
const UserTestHelper = {
  async cleanTable(){
    await Users.destroy({
      where : {},
    });
  },

  async getUserById(id){
    return Users.findOne({
      where : {
        id
      }
    });
  },

  async addUser({id = 'user-123', email = 'test@mail.com', fullname = 'user test', password = 'supersecretpass'}){
    await Users.create({
      id, email, fullname , password
    });
  }
}

module.exports = UserTestHelper;