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

  getDonationsByFundId() {
    throw new Error('DonationRepository is abstract class');
  }
}
module.exports = DonationRepository;
