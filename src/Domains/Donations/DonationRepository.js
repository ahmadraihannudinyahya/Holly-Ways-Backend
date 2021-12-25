class DonationRepository {
  addDonations() {
    throw new Error('DonationRepository is abstract class');
  }

  setStatusSuccessDonation() {
    throw new Error('DonationRepository is abstract class');
  }
}
module.exports = DonationRepository;
