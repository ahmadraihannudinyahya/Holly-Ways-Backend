const GetFund = require('../../../Domains/Fund/Entities/GetFund');

class GetFundByIdUseCase {
  constructor({ fundRepository , donationRepository}) {
    this.fundRepository = fundRepository;
    this.donationRepository = donationRepository;
  }

  async execute(fundId) {
    await this.fundRepository.verifyFundFound(fundId);
    const fund = await this.fundRepository.getFundById(fundId);
    const donationObtained = await this.donationRepository.getAprovedDonationCountByFundId(fundId);
    return new GetFund({
      id : fund.id, 
      title : fund.title,
      thumbnail : fund.thumbnail, 
      goal : fund.goal, 
      description : fund.description, 
      createdAt : fund.createdAt, 
      donationObtained
    });
  }
}
module.exports = GetFundByIdUseCase;
