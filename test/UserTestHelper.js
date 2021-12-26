const {Users} = require('../models')
const UserTestHelper = {
  async cleanTable(){
    await Users.destroy({
      where : {},
    });
  }
}

module.exports = UserTestHelper;