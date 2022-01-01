const GetFund = require("../../../Domains/Fund/Entities/GetFund");

class GetMyFundUseCase{
  constructor({tokenManager, fundRepository}){
    this.tokenManager = tokenManager;
    this.fundRepository = fundRepository;
  }
  async execute(payload){
    const { userId } = await this.tokenManager.verifyToken(payload.token);
    const funds = await this.fundRepository.getFundsByOwner(userId);
    return funds.map(fund => {
      return new GetFund({
        id : fund.id, 
        title : fund.title,
        thumbnail : fund.thumbnail, 
        goal : fund.goal, 
        description : fund.description, 
        createdAt : fund.createdAt, 
        donationObtained : fund.donations.reduce((total, donation) => {
          if( donation.fundId === fund.id ){
            return total + donation.donateAmount;
          };
          return total;
        }, 0)
      })
    });
  }
}
module.exports = GetMyFundUseCase;