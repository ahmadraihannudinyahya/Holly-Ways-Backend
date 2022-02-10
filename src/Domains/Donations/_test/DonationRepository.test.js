const DonationRepository = require('../DonationRepository');

describe('DonationRepository test', () => {
  it('should throw error when invoke unimplemented method', async () => {
    const donationRepository = new DonationRepository();

    await expect(donationRepository.addDonations()).rejects.toThrowError('DonationRepository is abstract class');
    await expect(donationRepository.setStatusSuccessDonation()).rejects.toThrowError('DonationRepository is abstract class');
    await expect(donationRepository.verifyDonationFound()).rejects.toThrowError('DonationRepository is abstract class');
    await expect(donationRepository.verifyDonationInFund()).rejects.toThrowError('DonationRepository is abstract class');
    await expect(donationRepository.getAllDonationsByFundId()).rejects.toThrowError('DonationRepository is abstract class');
    await expect(donationRepository.getSuccessDonationsByFundId()).rejects.toThrowError('DonationRepository is abstract class');
    await expect(donationRepository.getDonationCountByFundId()).rejects.toThrowError('DonationRepository is abstract class');
    await expect(donationRepository.getAllDonations()).rejects.toThrowError('DonationRepository is abstract class');
    await expect(donationRepository.getDonationsByUserIdWithFund()).rejects.toThrowError('DonationRepository is abstract class');
    await expect(donationRepository.getAprovedDonationCountByFundId()).rejects.toThrowError('DonationRepository is abstract class');
    await expect(donationRepository.getAprovedDonationAmountCountByFundId()).rejects.toThrowError('DonationRepository is abstract class');
  });
});
