class FundRepository {
  addFund() {
    throw new Error('FundRepository is abstract class');
  }

  getAllFund() {
    throw new Error('FundRepository is abstract class');
  }
}
module.exports = FundRepository;
