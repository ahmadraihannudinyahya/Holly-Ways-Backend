class UserRepository {
  async getAllUsers() {
    throw new Error('UserRepository is abstract class');
  }
}
module.exports = UserRepository;
