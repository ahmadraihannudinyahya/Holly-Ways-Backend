const RegisterUser = require('../../../Domains/RegisterUsers/Entities/RegisterUser');
const RegisteredUser = require('../../../Domains/RegisterUsers/Entities/RegisteredUser');

class RegisterUserUseCase {
  constructor({
    registerRepository, passwordHash, tokenManager, validation,
  }) {
    this.registerRepository = registerRepository;
    this.passwordHash = passwordHash;
    this.tokenManager = tokenManager;
    this.validation = validation;
  }

  async execute(payload) {
    this.validation.validateRegisterUserPayload(payload);
    const registerUser = new RegisterUser(payload);
    await this.registerRepository.verifyAvailableEmail(payload.email);
    registerUser.hashedPassword = await this.passwordHash.hashPassword(payload.password);
    registerUser.id = await this.registerRepository.addUser(registerUser);
    const token = await this.tokenManager.createToken(registerUser);
    return new RegisteredUser({ ...registerUser, token });
  }
}
module.exports = RegisterUserUseCase;
