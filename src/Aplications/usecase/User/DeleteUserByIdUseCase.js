class DeleteUserByIdUseCase {
  constructor({ tokenManager, userRepository }) {
    this.tokenManager = tokenManager;
    this.userRepository = userRepository;
  }

  async execute(payload) {
    const { userId: logedinuser } = await this.tokenManager.verifyToken(payload.token);
    await this.userRepository.verifyUserDeleteSelf(payload.userId, logedinuser);
    await this.userRepository.deleteUserById(payload.userId);
  }
}
module.exports = DeleteUserByIdUseCase;
