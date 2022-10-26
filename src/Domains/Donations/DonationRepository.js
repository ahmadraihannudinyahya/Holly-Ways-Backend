class DonationRepository {
  async addDonations() {
    throw new Error('DonationRepository is abstract class');
  }

  async setStatusSuccessDonation() {
    throw new Error('DonationRepository is abstract class');
  }

  async verifyDonationFound() {
    throw new Error('DonationRepository is abstract class');
  }

  async verifyDonationInFund() {
    throw new Error('DonationRepository is abstract class');
  }

  async getAllDonationsByFundId() {
    throw new Error('DonationRepository is abstract class');
  }

  async getSuccessDonationsByFundId() {
    throw new Error('DonationRepository is abstract class');
  }

  async getDonationCountByFundId() {
    throw new Error('DonationRepository is abstract class');
  }

  async getAllDonations() {
    throw new Error('DonationRepository is abstract class');
  }

  async getDonationsByUserIdWithFund() {
    throw new Error('DonationRepository is abstract class');
  }

  async getAprovedDonationCountByFundId() {
    throw new Error('DonationRepository is abstract class');
  }

  async getAprovedDonationAmountCountByFundId() {
    throw new Error('DonationRepository is abstract class');
  }
}
module.exports = DonationRepository;
