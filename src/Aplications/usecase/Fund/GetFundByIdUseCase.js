const GetFund = require('../../../Domains/Fund/Entities/GetFund');

class GetFundByIdUseCase {
  constructor({ fundRepository }) {
    this.fundRepository = fundRepository;
  }

  async execute(fundId) {
    await this.fundRepository.verifyFundFound(fundId);
    const fund = await this.fundRepository.getFundById(fundId);
    return new GetFund(fund);
  }
}
module.exports = GetFundByIdUseCase;
