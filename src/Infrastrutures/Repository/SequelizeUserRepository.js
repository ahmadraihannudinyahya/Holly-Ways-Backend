const UserRepository = require('../../Domains/User/UserRepository');

class SequelizeUserRepository extends UserRepository {
  constructor(Users) {
    super();
    this.Users = Users;
  }

  async getAllUsers() {
    return this.Users.findAll();
  }
}

module.exports = SequelizeUserRepository;
