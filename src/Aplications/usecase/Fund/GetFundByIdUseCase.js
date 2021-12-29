const GetFund = require('../../../Domains/Fund/Entities/GetFund');

class GetFundByIdUseCase {
  constructor({ fundRepository , donationRepository}) {
    this.fundRepository = fundRepository;
    this.donationRepository = donationRepository;
  }

  async execute(fundId) {
    await this.fundRepository.verifyFundFound(fundId);
    const fund = await this.fundRepository.getFundById(fundId);
    const donationObtained = await this.donationRepository.getDonationCountByFundId(fundId);
    return new GetFund({...fund, donationObtained});
  }
}
module.exports = GetFundByIdUseCase;
