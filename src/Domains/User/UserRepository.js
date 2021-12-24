class UserRepository {
  async getAllUsers() {
    throw new Error('UserRepository is abstract class');
  }

  async deleteUserById() {
    throw new Error('UserRepository is abstract class');
  }

  async verifyUserDeleteSelf() {
    throw new Error('UserRepository is abstract class');
  }

  async verifyUserRegisteredById() {
    throw new Error('UserRepository is abstract class');
  }
}
module.exports = UserRepository;
