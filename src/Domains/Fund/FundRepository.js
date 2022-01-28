class FundRepository {
  async addFund() {
    throw new Error('FundRepository is abstract class');
  }

  async getAllFund() {
    throw new Error('FundRepository is abstract class');
  }

  async verifyFundOwner() {
    throw new Error('FundRepository is abstract class');
  }

  async deleteFundById() {
    throw new Error('FundRepository is abstract class');
  }

  async verifyFundFound() {
    throw new Error('FundRepository is abstract class');
  }

  async getFundById() {
    throw new Error('FundRepository is abstract class');
  }

  async editFundById() {
    throw new Error('FundRepository is abstract class');
  }

  async getFundsByOwner() {
    throw new Error('FundRepository is abstract class');
  }

  async getAllFundsWithDonations() {
    throw new Error('FundRepository is abstract class');
  }

  async getFundsByIdWithDonations() {
    throw new Error('FundRepository is abstract class');
  }

  async getFundsByOwnerWithDonations() {
    throw new Error('FundRepository is abstract class');
  }

  async verifyFundStatusOpenById() {
    throw new Error('FundRepository is abstract class');
  }
}
module.exports = FundRepository;
