class LoginUserRepository {
  async verifyUserByEmail() {
    throw new Error('LoginUserRepository is abstract class');
  }

  async getUserByEmail() {
    throw new Error('LoginUserRepository is abstract class');
  }
}

module.exports = LoginUserRepository;
