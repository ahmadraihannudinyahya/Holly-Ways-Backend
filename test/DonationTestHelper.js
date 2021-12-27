const { Donations } = require('../models');
const DonationTestHelper = {
  async cleanTable(){
    await Donations.destroy({
      where : {},
    })
  }
}
module.exports = DonationTestHelper