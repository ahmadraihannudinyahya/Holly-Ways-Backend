const GetUser = require("../../../Domains/User/Entities/GetUser");

class GetProfilUseCase {
  constructor({tokenManager, userRepository}){
    this.tokenManager = tokenManager;
    this.userRepository = userRepository;
  }
  async execute(payload){
    const { userId } = await this.tokenManager.verifyToken(payload.token);
    await this.userRepository.verifyUserFound(userId);
    const user = await this.userRepository.getUserById(userId);
    return new GetUser(user);
  }
}
module.exports = GetProfilUseCase;