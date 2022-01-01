class DonationRepository {
  addDonations() {
    throw new Error('DonationRepository is abstract class');
  }

  setStatusSuccessDonation() {
    throw new Error('DonationRepository is abstract class');
  }

  verifyDonationFound() {
    throw new Error('DonationRepository is abstract class');
  }

  verifyDonationInFund() {
    throw new Error('DonationRepository is abstract class');
  }

  getAllDonationsByFundId() {
    throw new Error('DonationRepository is abstract class');
  }

  getSuccessDonationsByFundId() {
    throw new Error('DonationRepository is abstract class');
  }

  getDonationCountByFundId() {
    throw new Error('DonationRepository is abstract class');
  }

  getAllDonations() {
    throw new Error('DonationRepository is abstract class');
  }

  getDonationsByUserIdWithFund() {
    throw new Error('DonationRepository is abstract class');
  }
}
module.exports = DonationRepository;
