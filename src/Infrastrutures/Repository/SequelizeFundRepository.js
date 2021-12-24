const FundRepository = require('../../Domains/Fund/FundRepository');
const AuthorizationError = require('../../Commons/Exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/Exceptions/NotFoundError');

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

  async getAllFund() {
    return this.Funds.findAll();
  }

  async verifyFundOwner(fundId, ownerId) {
    const fund = await this.Funds.findOne({
      where: {
        id: fundId,
      },
    });

    if (fund.owner !== ownerId) {
      throw new AuthorizationError('Only owner can delete');
    }
  }

  async deleteFundById(id) {
    this.Funds.destroy({
      where: {
        id,
      },
    });
  }

  async verifyFundFound(id) {
    const fund = await this.Funds.findOne({
      where: {
        id,
      },
    });

    if (!fund) {
      throw new NotFoundError('Fund not found');
    }
  }
}

module.exports = SequelizeFundRepository;
