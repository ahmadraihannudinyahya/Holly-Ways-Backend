const DonationRepository = require('../../Domains/Donations/DonationRepository');
const NotFoundError = require('../../Commons/Exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/Exceptions/AuthorizationError');

class SequelizeDonationRepository extends DonationRepository {
  constructor(idGenerator, Donations, Users, Funds) {
    super();
    this.idGenerator = idGenerator;
    this.Donations = Donations;
    this.Users = Users;
    this.Funds = Funds;
  }

  async addDonations(newDonation) {
    const id = `donation-${this.idGenerator()}`;
    await this.Donations.create({ ...newDonation, id });
    return id;
  }

  async setStatusSuccessDonation(id) {
    this.Donations.update({ status: 'success' }, {
      where: {
        id,
      },
    });
  }

  async verifyDonationFound(id) {
    const donation = await this.Donations.findOne({
      where: {
        id,
      },
    });
    if (!donation) {
      throw new NotFoundError('Donation not Found');
    }
  }

  async verifyDonationInFund(donationId, fundId) {
    const donation = await this.Donations.findOne({
      where: {
        id: donationId,
      },
    });
    if (donation.fundId !== fundId) {
      throw new AuthorizationError('Donation must in Fund');
    }
  }

  async getAllDonationsByFundId(fundId) {
    return this.Donations.findAll({
      where: {
        fundId,
      },
      order : [
        ['createdAt', 'ASC']
      ],
      include: {
        model: this.Users,
        as: 'user',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'id', 'password'],
        },
      },
    });
  }

  async getSuccessDonationsByFundId(fundId) {
    return this.Donations.findAll({
      where: {
        fundId,
        status: 'success',
      },
      order : [
        ['createdAt', 'ASC']
      ],
      include: {
        model: this.Users,
        as: 'user',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'id', 'password'],
        },
      },
    });
  }

  async getDonationCountByFundId(fundId){
    const donations = await this.Donations.findAll({
      where : {
        fundId
      }
    });
    return donations.reduce((total, donation)=> total + donation.donateAmount, 0);
  }

  async getAllDonations(){
    return this.Donations.findAll({
      order : [
        ['createdAt', 'ASC']
      ],
    });
  }

  async getDonationsByUserIdWithFund(userId) {
    return this.Donations.findAll({
      where : {
        userId
      },
      order : [
        ['createdAt', 'ASC']
      ],
      include : {
        model: this.Funds,
        as: 'fund',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      }
    })
  }
}
module.exports = SequelizeDonationRepository;
