const TokenManager = require("../../Aplications/Security/TokenManager");

class JwtTokenManager extends TokenManager{
  constructor(jwt){
    this.jwt = jwt;
  }
  async createToken({id}){
    return this.jwt.sign({userId : id}, 'supersecret');
  }
}

module.exports= JwtTokenManager