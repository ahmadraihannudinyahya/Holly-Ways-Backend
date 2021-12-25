class DonationRepository {
  addDonations() {
    throw new Error('DonationRepository is abstract class');
  }
}
module.exports = DonationRepository;
