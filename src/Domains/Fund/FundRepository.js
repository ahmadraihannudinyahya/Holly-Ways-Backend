class FundRepository {
  addFund() {
    throw new Error('FundRepository is abstract class');
  }

  getAllFund() {
    throw new Error('FundRepository is abstract class');
  }

  verifyFundOwner() {
    throw new Error('FundRepository is abstract class');
  }

  deleteFundById() {
    throw new Error('FundRepository is abstract class');
  }

  verifyFundFound() {
    throw new Error('FundRepository is abstract class');
  }

  getFundById() {
    throw new Error('FundRepository is abstract class');
  }

  editFundById() {
    throw new Error('FundRepository is abstract class');
  }

  getFundsByOwner() {
    throw new Error('FundRepository is abstract class');
  }

  getAllFundsWithDonations() {
    throw new Error('FundRepository is abstract class');
  }

  getFundsByIdWithDonations() {
    throw new Error('FundRepository is abstract class');
  }

  getFundsByOwnerWithDonations() {
    throw new Error('FundRepository is abstract class');
  }

  verifyFundStatusOpenById() {
    throw new Error('FundRepository is abstract class');
  }
}
module.exports = FundRepository;
