const {Funds} = require('../models');

const FundTestHelper = {
  async cleanTable(){
    await Funds.destroy({
      where : {},
    });
  }
}

module.exports = FundTestHelper;