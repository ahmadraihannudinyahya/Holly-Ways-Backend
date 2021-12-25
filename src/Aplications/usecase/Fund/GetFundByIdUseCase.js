const GetFund = require('../../../Domains/Fund/Entities/GetFund');

class GetFundByIdUseCase {
  constructor({ fundRepository }) {
    this.fundRepository = fundRepository;
  }

  async execute() {
    const fund = await this.fundRepository.getFundById();
    return new GetFund(fund);
  }
}
module.exports = GetFundByIdUseCase;
