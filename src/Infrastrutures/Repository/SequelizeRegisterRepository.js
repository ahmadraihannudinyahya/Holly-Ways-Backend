const NotFoundError = require('../../Commons/Exceptions/NotFoundError');
const RegisterRepository = require("../../Domains/RegisterUsers/RegisterRepository");

class SequelizeRegisterRepository extends RegisterRepository{
  constructor(Users){
    super();
    this.Users = Users;
  }
  async verifyAvailableEmail(email){
    const data = await this.Users.findOne({
      where : {
        email
      }
    })
    if(data){
      throw new NotFoundError('Email already used');
    }
  }
  async addUser(registerUser){
    await this.Users.create(registerUser);
  }
}

module.exports = SequelizeRegisterRepository;