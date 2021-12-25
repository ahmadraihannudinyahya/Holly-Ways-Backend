const UserRepository = require('../../Domains/User/UserRepository');
const AuthorizationError = require('../../Commons/Exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/Exceptions/NotFoundError');

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

  async verifyUserFound(id) {
    const user = this.Users.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundError('User deleted');
    }
  }
}

module.exports = SequelizeUserRepository;
