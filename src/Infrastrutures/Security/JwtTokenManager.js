const TokenManager = require('../../Aplications/Security/TokenManager');
const AuthorizationError = require('../../Commons/Exceptions/AuthorizationError');

class JwtTokenManager extends TokenManager {
  constructor(jwt) {
    super();
    this.jwt = jwt;
  }

  async createToken({ userId }) {
    return this.jwt.sign({ userId }, process.env.TOKENKEY);
  }

  async verifyToken(token) {
    if (!token) throw new AuthorizationError('Restricted Feature');
    try {
      return this.jwt.verify(token, process.env.TOKENKEY);
    } catch (error) {
      throw new AuthorizationError('Token Invalid');
    }
  }
}

module.exports = JwtTokenManager;
