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

  async verifyUserFound() {
    throw new Error('UserRepository is abstract class');
  }

  async getUserById() {
    throw new Error('UserRepository is abstract class');
  }
  
  async getProfile() {
    throw new Error('UserRepository is abstract class');
  }
}
module.exports = UserRepository;
