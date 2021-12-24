const UserRepository = require('../../Domains/User/UserRepository');
const AuthorizationError = require('../../Commons/Exceptions/AuthorizationError');

class SequelizeUserRepository extends UserRepository {
  constructor(Users) {
    super();
    this.Users = Users;
  }

  async getAllUsers() {
    return this.Users.findAll();
  }

  async deleteUserById(id) {
    this.Users.destroy({
      where: {
        id,
      },
    });
  }

  async verifyUserDeleteSelf(deleteUser, logedinUser) {
    if (deleteUser !== logedinUser) throw new AuthorizationError('Only delete self');
  }
}

module.exports = SequelizeUserRepository;
