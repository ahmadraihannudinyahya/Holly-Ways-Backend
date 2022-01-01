const GetFund = require("../../../Domains/Fund/Entities/GetFund");

class GetMyFundUseCase{
  constructor({tokenManager, fundRepository}){
    this.tokenManager = tokenManager;
    this.fundRepository = fundRepository;
  }
  async execute(payload){
    const { userId } = await this.tokenManager.verifyToken(payload.token);
    const funds = await this.fundRepository.getFundsByOwner(userId);
    return funds.map(fund => GetFund(fund));
  }
}
module.exports = GetMyFundUseCase;