/* istanbul ignore file */
const {Users, Profiles} = require('../models')
const UserTestHelper = {
  async cleanTable(){
    await Profiles.destroy({
      where : {}, 
    });
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
    await Profiles.create({id : `profile-${id}`, userId : id});
  }, 

  async getProfileByUserId(id) {
    return Users.findOne({
      where : {
        id, 
      }, 
      include: {
        model: Profiles,
        as: 'profile',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        }
      },
    })
  }
}

module.exports = UserTestHelper;