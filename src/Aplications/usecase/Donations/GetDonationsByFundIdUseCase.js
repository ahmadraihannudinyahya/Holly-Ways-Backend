const GetDonation = require('../../../Domains/Donations/Entities/GetDonation');

class GetDonationsByFundIdUseCase {
  constructor({
    tokenManager, userRepository, fundRepository, donationsRepository,
  }) {
    this.tokenManager = tokenManager;
    this.userRepository = userRepository;
    this.fundRepository = fundRepository;
    this.donationsRepository = donationsRepository;
  }

  async execute(payload) {
    const { userId } = this.tokenManager.verifyToken(payload.token);
    await this.userRepository.verifyUserFound(userId);
    await this.fundRepository.verifyFundFound(payload.fundId);
    try {
      await this.fundRepository.verifyFundOwner(payload.fundId, userId);
      const donations = await this.donationsRepository.getAllDonationsByFundId(payload.fundId);
      return donations.map((donation) => new GetDonation(donation));
    } catch {
      const donations = await this.donationsRepository.getSuccessDonationsByFundId(payload.fundId);
      return donations.map((donation) => new GetDonation(donation));
    }
  }
}

module.exports = GetDonationsByFundIdUseCase;
