const FundRepository = require('../../Domains/Fund/FundRepository');
const AuthorizationError = require('../../Commons/Exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/Exceptions/NotFoundError');
const InvariantError = require('../../Commons/Exceptions/InvariantError');

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
    return this.Funds.findAll({
      where : {
        status : 'open'
      },
      order : [
        ['createdAt', 'ASC']
      ]
    });
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
    this.Funds.update({
      status : 'closed',
    },{
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
      order : [
        ['createdAt', 'ASC']
      ],
      include: {
        model: this.Donations,
        as: 'donations',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    });
  }

  async getAllFundsWithDonations() {
    return this.Funds.findAll({
      where : {
        status : 'open',
      },
      order : [
        ['createdAt', 'ASC']
      ],
      include: {
        model: this.Donations,
        as: 'donations',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        order : [
          ['createdAt', 'ASC']
        ],
      },
    });
  }

  async getFundsByIdWithDonations(id) {
    return this.Funds.findOne({
      where : {
        id
      },
      order : [
        ['createdAt', 'ASC']
      ],
      include: {
        model: this.Donations,
        as: 'donations',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        order : [
          ['createdAt', 'ASC']
        ],
      },
    });
  }

  async getFundsByOwnerWithDonations(owner) {
    return this.Funds.findAll({
      where : {
        owner
      },
      order : [
        ['createdAt', 'ASC']
      ],
      include: {
        model: this.Donations,
        as: 'donations',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        order : [
          ['createdAt', 'ASC']
        ],
      },
    });
  }

  async verifyFundStatusOpenById(id){
    const fund = await this.Funds.findOne({
      where : {
        id
      },
    });
    if(fund.status === 'closed'){
      throw new InvariantError('Fund is closed');
    }
  }
}

module.exports = SequelizeFundRepository;
