const FundRepository = require('../../Domains/Fund/FundRepository');

class SequelizeFundRepository extends FundRepository {
  constructor(Funds, idGenerator) {
    super();
    this.Funds = Funds;
    this.idGenerator = idGenerator;
  }

  async addFund(newFund) {
    const id = `fund-${this.idGenerator()}`;
    await this.Funds.create({ ...newFund, id });
    return id;
  }
}

module.exports = SequelizeFundRepository;
