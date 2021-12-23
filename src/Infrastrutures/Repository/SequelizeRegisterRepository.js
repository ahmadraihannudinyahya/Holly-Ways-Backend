const NotFoundError = require('../../Commons/Exceptions/NotFoundError');
const RegisterRepository = require("../../Domains/RegisterUsers/RegisterRepository");

class SequelizeRegisterRepository extends RegisterRepository{
  constructor(Users, idGenerator){
    super();
    this.Users = Users;
    this.idGenerator = idGenerator;
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
    const id = `user-${this.idGenerator()}`;
    await this.Users.create({...registerUser, id});
    return id;
  }
}

module.exports = SequelizeRegisterRepository;