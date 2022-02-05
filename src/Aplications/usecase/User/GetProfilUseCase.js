const GetProfile = require("../../../Domains/User/Entities/GetProfile");

class GetProfilUseCase {
  constructor({tokenManager, userRepository}){
    this.tokenManager = tokenManager;
    this.userRepository = userRepository;
  }
  async execute(payload){
    const { userId } = await this.tokenManager.verifyToken(payload.token);
    await this.userRepository.verifyUserFound(userId);
    const user = await this.userRepository.getProfile(userId);
    return new GetProfile(user);
  }
}
module.exports = GetProfilUseCase;