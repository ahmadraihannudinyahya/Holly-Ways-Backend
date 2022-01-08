const { Donations } = require('../models');
const DonationTestHelper = {
  async cleanTable(){
    await Donations.destroy({
      where : {},
    })
  },

  async getDonationById(id){
    return Donations.findOne({
      where : {
        id
      }
    })
  },

  async addDonation({id = 'donation-123', donateAmount = 20000, fundId = 'fund-123', proofAttachment = 'image.jpg', userId = 'user-123'}){
    await Donations.create({
      id, donateAmount, fundId, proofAttachment, userId
    });
  },

  async setStatusDonationById(id){
    await Donations.update({ status: 'success' }, {
      where: {
        id,
      },
    });
  },
}
module.exports = DonationTestHelper