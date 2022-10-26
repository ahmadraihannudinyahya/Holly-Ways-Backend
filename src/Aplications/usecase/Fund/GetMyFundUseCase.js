const GetFund = require('../../../Domains/Fund/Entities/GetFund');

class GetMyFundUseCase {
  constructor({ tokenManager, fundRepository }) {
    this.tokenManager = tokenManager;
    this.fundRepository = fundRepository;
  }

  async execute(payload) {
    const { userId } = await this.tokenManager.verifyToken(payload.token);
    const funds = await this.fundRepository.getFundsByOwnerWithDonations(userId);
    return funds.map((fund) => new GetFund({
      id: fund.id,
      title: fund.title,
      thumbnail: fund.thumbnail,
      goal: fund.goal,
      description: fund.description,
      createdAt: fund.createdAt,
      status: fund.status,
      donationObtained: fund.donations.reduce((total, donation) => {
        if (donation.status === 'success') {
          return total + donation.donateAmount;
        }
        return total;
      }, 0),
      donationCount: fund.donations.reduce((total, donation) => {
        if (donation.status === 'success') {
          return total + 1;
        }
        return total;
      }, 0),
    }));
  }
}
module.exports = GetMyFundUseCase;
