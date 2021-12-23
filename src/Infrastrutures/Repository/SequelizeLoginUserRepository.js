const LoginUserRepository = require("../../Domains/LoginUser/LoginUserRepository");
const NotFoundError = require('../../Commons/Exceptions/NotFoundError');

class SequelizeLoginUserRepository extends LoginUserRepository{
  constructor(Users){
    super();
    this.Users = Users;
  }
  async verifyUserByEmail(email){
    const user = await this.Users.findOne({
      where : {
        email
      }
    })
    if(!user){
      throw new NotFoundError('Email isnt registered, please register')
    }
  }
  async getUserByEmail(email){
    return this.Users.findOne({
      where : {
        email
      }
    })
  }
}

module.exports = SequelizeLoginUserRepository;