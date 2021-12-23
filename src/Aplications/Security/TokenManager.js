class TokenManager{
  async createToken(){
    throw new Error('TokenManager is abstract class');
  }
}
module.exports = TokenManager;