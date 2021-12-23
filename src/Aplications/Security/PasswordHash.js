class PasswordHash {
  async hashPassword() {
    throw new Error('PasswordHash is abstract class');
  }
}
module.exports = PasswordHash;
