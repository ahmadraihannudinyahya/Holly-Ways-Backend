const DonationRepository = require('../../Domains/Donations/DonationRepository');

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
}
module.exports = SequelizeDonationRepository;
