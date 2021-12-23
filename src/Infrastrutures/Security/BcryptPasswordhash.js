const Passwordhash = require('../../Aplications/Security/PasswordHash');
const AuthenticationError = require('../../Commons/Exceptions/AuthenticationError')

class BcryptPasswordhash extends Passwordhash{
  constructor(bcrypt, saltRound=10){
    super();
    this.bcrypt = bcrypt;
    this.saltRound = saltRound;
  }
  async hashPassword(payload){  
    return this.bcrypt.hash(payload, this.saltRound);
  }
  async comparePassword(plainPassword, hashedPassword){
    const result = await this.bcrypt.compare(plainPassword, hashedPassword);

    if(!result){
      throw new AuthenticationError('Password wrong');
    }
  }
}

module.exports = BcryptPasswordhash;