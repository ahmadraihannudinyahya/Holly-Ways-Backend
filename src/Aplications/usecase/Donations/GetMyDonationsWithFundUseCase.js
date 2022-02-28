const MyDonation = require('../../../Domains/Donations/Entities/MyDonation');

class GetMyDonationsWithFundUseCase {
  constructor({ tokenManager, donationsRepository }) {
    this.tokenManager = tokenManager;
    this.donationsRepository = donationsRepository;
  }

  async execute(payload) {
    const { userId } = await this.tokenManager.verifyToken(payload.token);
    const donations = await this.donationsRepository.getDonationsByUserIdWithFund(userId);
    return donations.map((donation) => new MyDonation({
      id: donation.id,
      donateAmount: donation.donateAmount,
      status: donation.status,
      proofAttachment: donation.proofAttachment,
      createdAt: donation.createdAt,
      fundTitle: donation.fund.title,
    }));
  }
}
module.exports = GetMyDonationsWithFundUseCase;
