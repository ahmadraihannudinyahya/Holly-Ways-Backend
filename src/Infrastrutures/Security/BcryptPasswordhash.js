const Passwordhash = require('../../Aplications/Security/PasswordHash')

class BcryptPasswordhash extends Passwordhash{
  constructor(bcrypt, saltRound){
    super();
    this.bcrypt = bcrypt;
    this.saltRound = saltRound;
  }
  async hashPassword(payload){  
    return this.bcrypt.hash(payload, this.saltRound);
  }
}

module.exports = BcryptPasswordhash;