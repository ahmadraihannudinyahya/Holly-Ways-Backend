const GetUser = require("../../../Domains/User/Entities/GetUser");

class GetProfilUseCase {
  constructor({tokenManager, userRepository}){
    this.tokenManager = tokenManager;
    this.userRepository = userRepository;
  }
  async execute(){
    const { userId } = await this.tokenManager.verifyToken(payload.token);
    const user = this.userRepository.getUserById(userId);
    return new GetUser(user);
  }
}
module.exports = GetProfilUseCase;