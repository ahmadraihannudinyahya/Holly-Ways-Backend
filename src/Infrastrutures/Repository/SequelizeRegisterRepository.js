const NotFoundError = require('../../Commons/Exceptions/NotFoundError');
const RegisterRepository = require('../../Domains/RegisterUsers/RegisterRepository');

class SequelizeRegisterRepository extends RegisterRepository {
  constructor(Users, idGenerator, Profiles) {
    super();
    this.Users = Users;
    this.idGenerator = idGenerator;
    this.Profiles = Profiles;
  }

  async verifyAvailableEmail(email) {
    const data = await this.Users.findOne({
      where: {
        email,
      },
    });
    if (data) {
      throw new NotFoundError('Email already used');
    }
  }

  async addUser(registerUser) {
    const userId = `user-${this.idGenerator()}`;
    await this.Users.create({ ...registerUser, id: userId });
    const profileId = `profile-${this.idGenerator()}`;
    await this.Profiles.create({ id: profileId, userId });
    return userId;
  }
}

module.exports = SequelizeRegisterRepository;
