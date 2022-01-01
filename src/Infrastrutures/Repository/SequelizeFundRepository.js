const FundRepository = require('../../Domains/Fund/FundRepository');
const AuthorizationError = require('../../Commons/Exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/Exceptions/NotFoundError');

class SequelizeFundRepository extends FundRepository {
  constructor(Funds, idGenerator, Donations) {
    super();
    this.Funds = Funds;
    this.idGenerator = idGenerator;
    this.Donations = Donations;
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

  async getFundById(id) {
    return this.Funds.findOne({
      where: {
        id,
      },
    });
  }

  async editFundById(editFund) {
    return this.Funds.update(editFund, {
      where: {
        id: editFund.id,
      },
    });
  }

  async getFundsByOwner(owner) {
    return this.Funds.findAll({
      where : {
        owner
      },
      include: {
        model: this.Donations,
        as: 'donations',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    });
  }
}

module.exports = SequelizeFundRepository;
