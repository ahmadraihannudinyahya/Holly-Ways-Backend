const GetFund = require('../../../Domains/Fund/Entities/GetFund');

class GetAllFundUseCase {
  constructor({ fundRepository , donationRepository}) {
    this.fundRepository = fundRepository;
    this.donationRepository = donationRepository;
  }

  async execute() {
    const funds = await this.fundRepository.getAllFundsWithDonations();
    return funds.map(fund => {
      return new GetFund({
        id : fund.id, 
        title : fund.title,
        thumbnail : fund.thumbnail, 
        goal : fund.goal, 
        description : fund.description, 
        createdAt : fund.createdAt, 
        donationObtained : fund.donations.reduce((total, donation) => {
          if(donation.status === 'success'){
            return total + donation.donateAmount;
          };
          return total;
        }, 0),
        donationCount : fund.donations.length
      })
    })
  }
}
module.exports = GetAllFundUseCase;
