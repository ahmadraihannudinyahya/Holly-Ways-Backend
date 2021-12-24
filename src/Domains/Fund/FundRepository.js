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
}
module.exports = FundRepository;
