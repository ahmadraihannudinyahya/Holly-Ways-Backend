const {Funds} = require('../models');

const FundTestHelper = {
  async cleanTable(){
    await Funds.destroy({
      where : {},
    });
  },

  async getFundById(id){
    return Funds.findOne({
      where : {
        id
      }
    });
  },

  async addFund({id ='fund-123',title = 'test fund title', description = 'test description', goal = 10000000, owner = 'user-123'}){
    await Funds.create({
      id, title, description, goal, owner
    });
  },

  async setFundCloseById(id){
    await Funds.update({ status : 'closed'}, {
      where : {
        id
      }
    })
  },
}

module.exports = FundTestHelper;