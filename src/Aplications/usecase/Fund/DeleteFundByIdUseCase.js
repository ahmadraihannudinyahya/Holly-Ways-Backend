class DeleteFundByIdUseCase {
  constructor({ fundRepository, tokenManager }) {
    this.fundRepository = fundRepository;
    this.tokenManager = tokenManager;
  }

  async execute(payload) {
    const { userId } = await this.tokenManager.verifyToken(payload.token);
    await this.fundRepository.verifyFundFound(payload.fundId);
    await this.fundRepository.verifyFundOwner(payload.fundId, userId);
    this.fundRepository.deleteFundById(payload.fundId);
  }
}
module.exports = DeleteFundByIdUseCase;
