class SetStatusSuccessDonationUseCase {
  constructor({
    tokenManager, userRepository, fundRepository, donationsRepository,
  }) {
    this.tokenManager = tokenManager;
    this.userRepository = userRepository;
    this.fundRepository = fundRepository;
    this.donationsRepository = donationsRepository;
  }

  async execute(payload) {
    const { userId } = await this.tokenManager.verifyToken(payload.token);
    await this.userRepository.verifyUserFound(userId);
    await this.fundRepository.verifyFundFound(payload.fundId);
    await this.fundRepository.verifyFundOwner(payload.fundId, userId);
    await this.donationsRepository.verifyDonationFound(payload.donationId);
    await this.donationsRepository.verifyDonationInFund(payload.donationId, payload.fundId);
    await this.donationsRepository.setStatusSuccessDonation(payload.donationId);
  }
}
module.exports = SetStatusSuccessDonationUseCase;
