const GetFund = require('../../../Domains/Fund/Entities/GetFund');

class GetAllFundUseCase {
  constructor({ fundRepository , donationRepository}) {
    this.fundRepository = fundRepository;
    this.donationRepository = donationRepository;
  }

  async execute() {
    const funds = await this.fundRepository.getAllFund();
    const donations = await this.donationRepository.getAllDonations();
    return funds.map(fund => {
      const donationObtained = donations.reduce((total, donation) => {
        if( donation.fundId === fund.id ){
          total + donation.donateAmount
        };
      }, 0);
      return new GetFund({
        id : fund.id, 
        title : fund.title,
        thumbnail : fund.thumbnail, 
        goal : fund.goal, 
        description : fund.description, 
        donationObtained
      })
    })
  }
}
module.exports = GetAllFundUseCase;
