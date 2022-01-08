class DeleteFundByIdUseCase {
  constructor({ fundRepository, tokenManager , storageService}) {
    this.fundRepository = fundRepository;
    this.tokenManager = tokenManager;
    this.storageService = storageService;
  }

  async execute(payload) {
    const { userId } = await this.tokenManager.verifyToken(payload.token);
    await this.fundRepository.verifyFundFound(payload.fundId);
    await this.fundRepository.verifyFundOwner(payload.fundId, userId);
    await this.fundRepository.deleteFundById(payload.fundId);
  }
}
module.exports = DeleteFundByIdUseCase;
