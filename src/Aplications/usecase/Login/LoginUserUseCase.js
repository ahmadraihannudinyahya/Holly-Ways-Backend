const LoginUser = require('../../../Domains/LoginUser/Entities/LoginUser');
const LogedinUser = require('../../../Domains/LoginUser/Entities/LogedinUser');

class LoginUserUseCase {
  constructor({
    loginUserRepository, passwordHash, tokenManager, validation,
  }) {
    this.loginUserRepository = loginUserRepository;
    this.passwordHash = passwordHash;
    this.tokenManager = tokenManager;
    this.validation = validation;
  }

  async execute(payload) {
    this.validation.validateLoginUserPayload(payload);
    const loginUser = new LoginUser(payload);
    await this.loginUserRepository.verifyUserByEmail(loginUser.email);
    const user = await this.loginUserRepository.getUserByEmail(loginUser.email);
    await this.passwordHash.comparePassword(loginUser.password, user.password);
    loginUser.id = user.id;
    const token = await this.tokenManager.createToken(loginUser);
    return new LogedinUser({ ...loginUser, fullname: user.fullname, token });
  }
}

module.exports = LoginUserUseCase;
