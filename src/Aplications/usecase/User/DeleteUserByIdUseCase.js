class DeleteUserByIdUseCase {
  constructor({ tokenManager, userRepository }) {
    this.tokenManager = tokenManager;
    this.userRepository = userRepository;
  }

  async execute(payload) {
    const logedinuser = await this.tokenManager.verifyToken(payload.token);
    await this.userRepository.verifyUserDeleteSelf(payload.userId, logedinuser);
    this.userRepository.deleteUserById(payload.userId);
  }
}
module.exports = DeleteUserByIdUseCase;
