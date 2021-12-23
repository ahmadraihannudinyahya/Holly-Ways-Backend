const RegisterUser = require('../../../Domains/RegisterUsers/Entities/RegisterUser');

class RegisterUserUseCase{
  constructor({registerRepository, passwordHash, tokenManager}){
    this.registerRepository = registerRepository;
    this.passwordHash = passwordHash;
    this.tokenManager = tokenManager;
  }
  async execute(payload){
    const registerUser = new RegisterUser(payload);
    await this.registerRepository.verifyAvailableEmail(payload.email);
    registerUser.hashedPassword = await this.passwordHash.hashPassword(payload.pasword);
    await this.registerRepository.addUser(registerUser);
    const token = await this.tokenManager.createToken(registerUser);
    return new RegisteredUser({...registerUser, token});
  }
}
module.exports = RegisterUserUseCase;