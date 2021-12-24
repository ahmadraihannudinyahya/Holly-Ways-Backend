const GetFund = require('../../../Domains/Fund/Entities/GetFund');

class GetAllFundUseCase {
  constructor({ fundRepository }) {
    this.fundRepository = fundRepository;
  }

  async execute() {
    const funds = await this.fundRepository.getAllFund();
    return funds.map((fund) => new GetFund(fund));
  }
}
module.exports = GetAllFundUseCase;
