const DonationRepository = require('../../Domains/Donations/DonationRepository');
const NotFoundError = require('../../Commons/Exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/Exceptions/AuthorizationError');

class SequelizeDonationRepository extends DonationRepository {
  constructor(idGenerator, Donations) {
    super();
    this.idGenerator = idGenerator;
    this.Donations = Donations;
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
    });
  }

  async getSuccessDonationsByFundId(fundId) {
    return this.Donations.findAll({
      where: {
        fundId,
        status: 'success',
      },
    });
  }
}
module.exports = SequelizeDonationRepository;
