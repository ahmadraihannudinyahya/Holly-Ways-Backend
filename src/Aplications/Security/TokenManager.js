class TokenManager {
  async createToken() {
    throw new Error('TokenManager is abstract class');
  }

  async verivyToken() {
    throw new Error('TokenManager is abstract class');
  }
}
module.exports = TokenManager;
