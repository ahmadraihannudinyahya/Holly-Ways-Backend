const GetFund = require('../../../Domains/Fund/Entities/GetFund');

class GetFundByIdUseCase {
  constructor({ fundRepository , donationRepository}) {
    this.fundRepository = fundRepository;
    this.donationRepository = donationRepository;
  }

  async execute(fundId) {
    await this.fundRepository.verifyFundFound(fundId);
    const fund = await this.fundRepository.getFundsByIdWithDonations(fundId);
    return new GetFund({
      id : fund.id, 
      title : fund.title,
      thumbnail : fund.thumbnail, 
      goal : fund.goal, 
      description : fund.description, 
      createdAt : fund.createdAt, 
      status : fund.status, 
      donationObtained : fund.donations.reduce((total, donation) => {
        if(donation.status === 'success'){
          return total + donation.donateAmount;
        };
        return total;
      }, 0),
      donationCount : fund.donations.reduce((total, donation)=>{
        if(donation.status === 'success'){
          return total ++;
        };
        return total;
      }, 0),
    });
  }
}
module.exports = GetFundByIdUseCase;
