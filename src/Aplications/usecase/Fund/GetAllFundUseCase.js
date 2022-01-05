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
      return new GetFund({
        id : fund.id, 
        title : fund.title,
        thumbnail : fund.thumbnail, 
        goal : fund.goal, 
        description : fund.description, 
        createdAt : fund.createdAt, 
        donationObtained : donations.reduce((total, donation) => {
          if( donation.fundId === fund.id ){
            if(donation.status === 'success'){
              return total + donation.donateAmount;
            }
          };
          return total;
        }, 0),
        donationCount : donations.reduce((total, donation) => {
          if( donation.fundId === fund.id ){
            if(donation.status === 'success'){
              return total ++
            }
          };
          return total;
        }, 0),
      })
    })
  }
}
module.exports = GetAllFundUseCase;
