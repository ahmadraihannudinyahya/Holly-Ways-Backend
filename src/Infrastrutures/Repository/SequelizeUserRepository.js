const UserRepository = require('../../Domains/User/UserRepository');
const AuthorizationError = require('../../Commons/Exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/Exceptions/NotFoundError');

class SequelizeUserRepository extends UserRepository {
  constructor(Users, Profiles) {
    super();
    this.Users = Users;
    this.Profiles = Profiles;
  }

  async getAllUsers() {
    return this.Users.findAll();
  }

  async deleteUserById(id) {
    await this.Profiles.destroy({
      where : {
        userId : id, 
      }, 
    });
    await this.Users.destroy({
      where: {
        id,
      },
    });
  }

  async verifyUserDeleteSelf(deleteUser, logedinUser) {
    if (deleteUser !== logedinUser) throw new AuthorizationError('Only delete self');
  }

  async verifyUserFound(id) {
    const user = await this.Users.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundError('User deleted');
    }
  }

  async getUserById(id) {
    return this.Users.findOne({
      where : {
        id
      },
    })
  }

  async getProfile(userId) {
    const result = await this.Users.findOne({
      where : {
        id : userId, 
      }, 
      include: {
        model: this.Profiles,
        as: 'profile',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        }
      },
    });
    return({...result.dataValues, ...result.dataValues.profile.dataValues});
  }

  async editProfile(payload, userId){
    if(payload.fullname){
      await this.Users.update(payload, {
        where : {
          id : userId, 
        }, 
      });
    };
    await this.Profiles.update(payload, {
      where : {
        userId, 
      }, 
    });
  }
}

module.exports = SequelizeUserRepository;
