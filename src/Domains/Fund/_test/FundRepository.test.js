/* istanbul ignore file */
const FundRepository = require('../FundRepository');

describe('FundRepository test', () => {
  it('should throw error when invoke unimplemented method', async () => {
    const fundRepository = new FundRepository();

    await expect(fundRepository.addFund()).rejects.toThrowError('FundRepository is abstract class');
    await expect(fundRepository.getAllFund()).rejects.toThrowError('FundRepository is abstract class');
    await expect(fundRepository.verifyFundOwner()).rejects.toThrowError('FundRepository is abstract class');
    await expect(fundRepository.deleteFundById()).rejects.toThrowError('FundRepository is abstract class');
    await expect(fundRepository.verifyFundFound()).rejects.toThrowError('FundRepository is abstract class');
    await expect(fundRepository.getFundById()).rejects.toThrowError('FundRepository is abstract class');
    await expect(fundRepository.editFundById()).rejects.toThrowError('FundRepository is abstract class');
    await expect(fundRepository.getFundsByOwner()).rejects.toThrowError('FundRepository is abstract class');
    await expect(fundRepository.getAllFundsWithDonations()).rejects.toThrowError('FundRepository is abstract class');
    await expect(fundRepository.getFundsByIdWithDonations()).rejects.toThrowError('FundRepository is abstract class');
    await expect(fundRepository.getFundsByOwnerWithDonations()).rejects.toThrowError('FundRepository is abstract class');
    await expect(fundRepository.verifyFundStatusOpenById()).rejects.toThrowError('FundRepository is abstract class');
  });
});
